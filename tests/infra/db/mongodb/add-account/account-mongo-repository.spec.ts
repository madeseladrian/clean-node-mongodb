import { AddAccountMongoRepository } from '@/infra/db/mongodb/add-account'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

import { mockAddAccountParams } from '@/tests/application/usecases/mocks'

const makeSut = (): AddAccountMongoRepository => {
  return new AddAccountMongoRepository()
}

describe('AddAccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    const sut = makeSut()
    const addAccountParams = mockAddAccountParams()
    const isValid = await sut.add(addAccountParams)
    expect(isValid).toBe(true)
  })
})
