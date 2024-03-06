import { faker } from "@faker-js/faker"

import { AddAccountController } from "@/infra/controllers"
import { EmailInUseError, MissingParamError, ServerError } from "@/infra/errors"
import { badRequest, forbidden, ok, serverError } from "@/infra/helpers"

import {
  AddAccountSpy,
  mockAddAccountRequest,
  ValidationSpy
} from "@/tests/infra/controllers/mocks"
import { throwError } from "@/tests/infra/errors"

type SutTypes = {
  sut: AddAccountController
  addAccountSpy: AddAccountSpy
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const addAccountSpy = new AddAccountSpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddAccountController(addAccountSpy, validationSpy)
  return {
    sut,
    addAccountSpy,
    validationSpy
  }
}

describe('AddAccountController', () => {
  test('Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockAddAccountRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return 400 (BadRequest) if Validation returns an error', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new MissingParamError(faker.word.noun())
    const httpResponse = await sut.handle(mockAddAccountRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('Should return 500 (ServerError) if Validation throws', async () => {
    const { sut, validationSpy } = makeSut()
    jest.spyOn(validationSpy, 'validate').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockAddAccountRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('Should call AddAccount with correct values', async () => {
    const { sut, addAccountSpy } = makeSut()
    const request = mockAddAccountRequest()
    await sut.handle(request)
    expect(addAccountSpy.params).toEqual({
      name: request.name,
      email: request.email,
      password: request.password
    })
  })

  test('Should return 403 (Forbidden) if Validation returns an error', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(mockAddAccountRequest())
    expect(httpResponse).toEqual(forbidden(new EmailInUseError()))
  })

  test('Should return 200 (Ok) if valid data is provided', async () => {
    const { sut, addAccountSpy } = makeSut()
    addAccountSpy.result = true
    const httpResponse = await sut.handle(mockAddAccountRequest())
    expect(httpResponse).toEqual(ok(addAccountSpy.result))
  })

  test('Should return 500 (ServerError) if AddAccount throws', async () => {
    const { sut, addAccountSpy } = makeSut()
    jest.spyOn(addAccountSpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockAddAccountRequest())
    expect(httpResponse).toEqual(serverError(new ServerError(null)))
  })
})
