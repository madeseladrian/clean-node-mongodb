import { faker } from "@faker-js/faker"

import { AddAccountController } from "@/application/controllers"
import { EmailInUseError, MissingParamError } from "@/application/errors"
import { badRequest, forbidden, serverError } from "@/application/helpers"

import {
  AddAccountSpy,
  mockAddAccountRequest,
  ValidationSpy
} from "@/tests/application/controllers/mocks"
import { throwError } from "@/tests/application/errors"

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
})
