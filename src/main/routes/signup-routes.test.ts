import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
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
