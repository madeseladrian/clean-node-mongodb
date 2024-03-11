import { faker } from '@faker-js/faker'
import { type Collection } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { CheckAccountByEmailRepositoryMongo } from '@/infra/db/mongodb/signup'

import { mockSignUpParams } from '@/tests/application/usecases/signup/mocks'

const makeSut = (): CheckAccountByEmailRepositoryMongo => {
  return new CheckAccountByEmailRepositoryMongo()
}

let accountCollection: Collection

describe('CheckAccountByEmailRepositoryMongo', () => {
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

  test('Should return true if email is valid', async () => {
    const sut = makeSut()
    const signUpParams = mockSignUpParams()
    await accountCollection.insertOne(signUpParams)
    const exists = await sut.checkByEmail({ email: signUpParams.email })
    expect(exists).toBe(true)
  })

  test('Should return false if email is not valid', async () => {
    const sut = makeSut()
    const exists = await sut.checkByEmail({ email: faker.internet.email() })
    expect(exists).toBe(false)
  })
})
