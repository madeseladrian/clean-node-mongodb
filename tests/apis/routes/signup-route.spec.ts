import { type Express } from 'express'
import { type Collection } from 'mongodb'
import request from 'supertest'

import { setupApp } from '@/apis/config/app'

import { MongoHelper } from '@/infra/db/mongodb/helpers'

import { mockSignUpParams } from '@/tests/application/usecases/signup/mocks'

const params = mockSignUpParams()

let accountCollection: Collection
let app: Express

describe('SignUp Route', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return 200 on signup', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: params.name,
        email: params.email,
        password: params.password,
        passwordConfirmation: params.password
      })
      .expect(200)
    await request(app)
      .post('/api/signup')
      .send({
        name: params.name,
        email: params.email,
        password: params.password,
        passwordConfirmation: params.password
      })
      .expect(403)
  })
})
