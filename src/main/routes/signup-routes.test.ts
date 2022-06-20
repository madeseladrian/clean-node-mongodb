import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('SignUp Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.getCollection('accounts').deleteMany({})
  })

  test('1 - Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Mades',
        email: 'mades@gmail.com',
        password: '123456',
        confirmPassword: '123456'
      })
      .expect(200)
  })
})
