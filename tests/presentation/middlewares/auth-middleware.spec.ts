import { AccessDeniedError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers'
import { AuthMiddleware } from '@/presentation/middlewares'

type SutTypes = {
  sut: AuthMiddleware
}

const makeSut = (role?: string): SutTypes => {
  const sut = new AuthMiddleware()
  return {
    sut
  }
}

describe('Auth Middleware', () => {
  test('1 - Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
