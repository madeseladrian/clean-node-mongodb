import { type Express } from 'express'
import request from 'supertest'

import { setupApp } from '@/apis/config/app'
import { faker } from '@faker-js/faker'

const userName = faker.internet.userName()
let app: Express

describe('Body Parser Middleware', () => {
  beforeAll(async () => {
    app = await setupApp()
  })

  test('Should parse body as json', async () => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ name: userName })
      .expect({ name: userName })
  })
})
