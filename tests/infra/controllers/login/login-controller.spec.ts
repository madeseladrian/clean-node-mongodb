import { faker } from '@faker-js/faker'

import { LoginController } from '@/infra/controllers'
import { badRequest, serverError, unauthorized } from '@/infra/http'

import { MissingParamError } from '@/application/errors'

import { LoginSpy, mockLoginRequest } from '@/tests/infra/controllers/login/mocks'

import { ValidationSpy } from '@/tests/application/validation/mocks'
import { throwError } from '@/tests/application/errors'

type SutTypes = {
  sut: LoginController
  loginSpy: LoginSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const loginSpy = new LoginSpy()
  const validationSpy = new ValidationSpy()
  const sut = new LoginController(loginSpy, validationSpy)
  return {
    sut,
    loginSpy,
    validationSpy
  }
}

describe('LoginController', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockLoginRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.word.noun())
    const httpResponse = await sut.handle(mockLoginRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 500 (ServerError) if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockLoginRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call Login with correct values', async () => {
    const { sut, loginSpy } = makeSut()
    const request = mockLoginRequest()
    await sut.handle(request)
    expect(loginSpy.params).toEqual({
      email: request.email,
      password: request.password
    })
  })

  test('Should return 401 if invalid credentials are provided', async () => {
    const { sut, loginSpy } = makeSut()
    loginSpy.result = null
    const httpResponse = await sut.handle(mockLoginRequest())
    expect(httpResponse).toEqual(unauthorized())
  })
})
