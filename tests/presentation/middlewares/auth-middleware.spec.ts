import { AccessDeniedError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers'
import { AuthMiddleware } from '@/presentation/middlewares'
import { LoadAccountByTokenSpy } from '@/tests/presentation/mocks'

const mockRequest = (): AuthMiddleware.Request => ({
  accessToken: 'any_token'
})

type SutTypes = {
  loadAccountByTokenSpy: LoadAccountByTokenSpy
  sut: AuthMiddleware
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountByTokenSpy = new LoadAccountByTokenSpy()
  const sut = new AuthMiddleware(loadAccountByTokenSpy)
  return {
    loadAccountByTokenSpy,
    sut
  }
}

describe('Auth Middleware', () => {
  test('1 - Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('2 - Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountByTokenSpy } = makeSut(role)
    const httpRequest = mockRequest()
    await sut.handle(httpRequest)
    expect(loadAccountByTokenSpy.accessToken).toBe(httpRequest.accessToken)
  })

  test('3 - Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountByTokenSpy } = makeSut()
    loadAccountByTokenSpy.result = null
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })
})
