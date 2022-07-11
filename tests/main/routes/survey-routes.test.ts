import { MongoHelper } from '@/infra/db'
import { setupApp } from '@/main/config/app'
import env from '@/main/config/env'
import { Express } from 'express'
import { sign } from 'jsonwebtoken'
import { Collection } from 'mongodb'
import request from 'supertest'

describe('Surveys Routes', () => {
  let surveyCollection: Collection
  let accountCollection: Collection
  let app: Express

  const mockAccessToken = async (): Promise<string> => {
    const res = await accountCollection.insertOne({
      name: 'Mades',
      email: 'mades@gmail.com',
      password: '123456',
      role: 'admin'
    })
    const id = res.insertedId.toHexString()
    const accessToken = sign({ id }, env.jwtSecret)
    await accountCollection.updateOne({
      _id: res.insertedId
    }, {
      $set: {
        accessToken
      }
    })
    return accessToken
  }

  describe('Survey Routes', () => {
    beforeAll(async () => {
      app = await setupApp()
      await MongoHelper.connect(process.env.MONGO_URL)
    })

    afterAll(async () => {
      await MongoHelper.disconnect()
    })

    beforeEach(async () => {
      surveyCollection = MongoHelper.getCollection('surveys')
      await surveyCollection.deleteMany({})
      accountCollection = MongoHelper.getCollection('accounts')
      await accountCollection.deleteMany({})
    })

    describe('POST /surveys', () => {
      test('1 - Should return 403 on add survey without accessToken', async () => {
        await request(app)
          .post('/api/surveys')
          .send({
            question: 'Question',
            answers: [{
              answer: 'Answer 1',
              image: 'http://image-name.com'
            }, {
              answer: 'Answer 2'
            }]
          })
          .expect(403)
      })

      test('2 - Should return 204 on add survey with valid accessToken', async () => {
        const accessToken = await mockAccessToken()
        await request(app)
          .post('/api/surveys')
          .set('x-access-token', accessToken)
          .send({
            question: 'Question',
            answers: [{
              answer: 'Answer 1',
              image: 'http://image-name.com'
            }, {
              answer: 'Answer 2'
            }]
          })
          .expect(204)
      })
    })
  })
})
