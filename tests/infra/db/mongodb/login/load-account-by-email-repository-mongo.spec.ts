import { faker } from '@faker-js/faker'
import { type Collection } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { LoadAccountByEmailRepositoryMongo } from '@/infra/db/mongodb/login'

import { mockSignUpParams } from '@/tests/application/usecases/signup/mocks'

const makeSut = (): LoadAccountByEmailRepositoryMongo => {
  return new LoadAccountByEmailRepositoryMongo()
}

let accountCollection: Collection

describe('LoadAccountByEmailRepositoryMongo', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const signUpParams = mockSignUpParams()
    await accountCollection.insertOne(signUpParams)
    const account = await sut.loadByEmail({ email: signUpParams.email })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe(signUpParams.name)
    expect(account.password).toBe(signUpParams.password)
  })

  test('Should return null if loadByEmail fails', async () => {
    const sut = makeSut()
    const account = await sut.loadByEmail({ email: faker.internet.email() })
    expect(account).toBeFalsy()
  })
})
