import { faker } from '@faker-js/faker'
import { type Collection } from 'mongodb'

import { SignUpMongoRepository } from '@/infra/db/mongodb/signup'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

import { mockSignUpParams } from '@/tests/application/usecases/mocks'

const makeSut = (): SignUpMongoRepository => {
  return new SignUpMongoRepository()
}

let accountCollection: Collection

describe('SignUpMongoRepository', () => {
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

  describe('add()', () => {
    test('Should return an account on success', async () => {
      const sut = makeSut()
      const signUpParams = mockSignUpParams()
      const isValid = await sut.add(signUpParams)
      expect(isValid).toBe(true)
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut()
      const signUpParams = mockSignUpParams()
      await accountCollection.insertOne(signUpParams)
      const exists = await sut.checkByEmail(signUpParams.email)
      expect(exists).toBe(true)
    })

    test('Should return false if email is not valid', async () => {
      const sut = makeSut()
      const exists = await sut.checkByEmail(faker.internet.email())
      expect(exists).toBe(false)
    })
  })
})
