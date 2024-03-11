import { type Collection } from 'mongodb'
import { faker } from '@faker-js/faker'

import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { UpdateAccessTokenRepositoryMongo } from '@/infra/db/mongodb/login'

import { mockSignUpParams } from '@/tests/application/usecases/signup/mocks'

const makeSut = (): UpdateAccessTokenRepositoryMongo => {
  return new UpdateAccessTokenRepositoryMongo()
}

let accountCollection: Collection

describe('UpdateAccessTokenRepositoryMongo', () => {
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

  test('Should update the account accessToken on success', async () => {
    const sut = makeSut()
    const res = await accountCollection.insertOne(mockSignUpParams())
    const fakeAccount = await accountCollection.findOne({ _id: res.insertedId })
    expect(fakeAccount.accessToken).toBeFalsy()
    const accessToken = faker.string.uuid()
    await sut.updateAccessToken({
      id: fakeAccount._id.toString(), // Convert ObjectId to string
      token: accessToken
    })
    const account = await accountCollection.findOne({ _id: fakeAccount._id })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe(accessToken)
  })
})
