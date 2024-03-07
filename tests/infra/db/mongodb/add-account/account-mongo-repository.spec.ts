import { faker } from '@faker-js/faker'
import { type Collection } from 'mongodb'

import { AddAccountMongoRepository } from '@/infra/db/mongodb/add-account'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

import { mockAddAccountParams } from '@/tests/application/usecases/mocks'

const makeSut = (): AddAccountMongoRepository => {
  return new AddAccountMongoRepository()
}

let accountCollection: Collection

describe('AddAccountMongoRepository', () => {
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
      const addAccountParams = mockAddAccountParams()
      const isValid = await sut.add(addAccountParams)
      expect(isValid).toBe(true)
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut()
      const addAccountParams = mockAddAccountParams()
      await accountCollection.insertOne(addAccountParams)
      const exists = await sut.checkByEmail(addAccountParams.email)
      expect(exists).toBe(true)
    })
  })
})
