import { hash } from 'bcrypt'
import { type Express } from 'express'
import { type Collection } from 'mongodb'
import request from 'supertest'

import { setupApp } from '@/apis/config/app'

import { MongoHelper } from '@/infra/db/mongodb/helpers'

import { mockSignUpParams } from '@/tests/application/usecases/signup/mocks'

const params = mockSignUpParams()

let accountCollection: Collection
let app: Express

describe('Login Route', () => {
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

  test('Should return 200 on login', async () => {
    const hashedPassword = await hash(params.password, 12)
    await accountCollection.insertOne({
      name: params.name,
      email: params.email,
      password: hashedPassword
    })
    await request(app)
      .post('/api/login')
      .send({
        email: params.email,
        password: params.password
      })
      .expect(200)
  })

  test('Should return 401 on login', async () => {
    await request(app)
      .post('/api/login')
      .send({
        email: params.email,
        password: params.password
      })
      .expect(401)
  })
})
