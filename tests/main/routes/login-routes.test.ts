import { MongoHelper } from '@/infra/db'
import { setupApp } from '@/main/config/app'
import { hash } from 'bcrypt'
import { Express } from 'express'
import { Collection } from 'mongodb'
import request from 'supertest'

let accountCollection: Collection
let app: Express

describe('Login Routes', () => {
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

  describe('POST /signup', () => {
    test('1 - Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Mades',
          email: 'mades@gmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('1 - Should return 200 on signup', async () => {
      const password = await hash('123456', 12)
      await accountCollection.insertOne({
        name: 'Mades',
        email: 'mades@gmail.com',
        password: password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'mades@gmail.com',
          password: '123456'
        })
        .expect(200)
    })

    test('2 - Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'mades@gmail.com',
          password: '123456'
        })
        .expect(401)
    })
  })
})
