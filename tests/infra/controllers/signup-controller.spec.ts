import { faker } from '@faker-js/faker'

import { SignUpController } from '@/infra/controllers'
import { EmailInUseError, MissingParamError, ServerError } from '@/application/errors'
import { badRequest, forbidden, ok, serverError } from '@/infra/http'

import {
  SignUpSpy,
  mockSignUpRequest,
  ValidationSpy
} from '@/tests/infra/controllers/mocks'
import { throwError } from '@/tests/infra/errors'

type SutTypes = {
  sut: SignUpController
  signUpSpy: SignUpSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const signUpSpy = new SignUpSpy()
  const validationSpy = new ValidationSpy()
  const sut = new SignUpController(signUpSpy, validationSpy)
  return {
    sut,
    signUpSpy,
    validationSpy
  }
}

describe('SignUpController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockSignUpRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 (BadRequest) if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.word.noun())
    const httpResponse = await sut.handle(mockSignUpRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 500 (ServerError) if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockSignUpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call SignUp with correct values', async () => {
    const { sut, signUpSpy } = makeSut()
    const request = mockSignUpRequest()
    await sut.handle(request)
    expect(signUpSpy.params).toEqual({
      name: request.name,
      email: request.email,
      password: request.password
    })
  })

  test('Should return 403 (Forbidden) if Validation returns an error', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockSignUpRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 (Ok) if valid data is provided', async () => {
    const { sut, signUpSpy } = makeSut()
    signUpSpy.result = true
    const httpResponse = await sut.handle(mockSignUpRequest())
    expect(httpResponse).toEqual(ok(signUpSpy.result))
  })

  test('Should return 500 (ServerError) if SignUp throws', async () => {
    const { sut, signUpSpy } = makeSut()
    jest.spyOn(signUpSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockSignUpRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
