import { type Collection } from 'mongodb'

import { SignUpRepositoryMongo } from '@/infra/db/mongodb/signup'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

import { mockSignUpParams } from '@/tests/application/usecases/signup/mocks'

const makeSut = (): SignUpRepositoryMongo => {
  return new SignUpRepositoryMongo()
}

let accountCollection: Collection

describe('SignUpRepositoryMongo', () => {
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
    const isValid = await sut.add(signUpParams)
    expect(isValid).toBe(true)
  })
})
