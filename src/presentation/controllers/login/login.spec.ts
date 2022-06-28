import { MissingParamError } from '../../errors'
import { badRequest } from '../../helpers'
import { LoginController } from '.'

describe('Login Controller', () => {
  test('1 - Should return 400 if no email is provided', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }
    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
  })
})
