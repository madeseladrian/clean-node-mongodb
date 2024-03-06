import { faker } from "@faker-js/faker"

import { throwError } from "@/tests/application/usecases/errors"

const mockAddAccountRequest = (): AddAccountController.Request => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordConfirmation: faker.internet.password()
})

namespace AddAccountController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}
type HttpResponse = {
  statusCode: number
  body: any
}

interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}

class AddAccountController implements Controller<AddAccountController.Request> {
  constructor (private readonly validation: Validation) {}

  async handle (request: AddAccountController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}

interface Validation {
  validate: (input: any) => Error
}

class ValidationSpy implements Validation {
  error: Error = null
  input: any

  validate (input: any): Error {
    this.input = input
    return this.error
  }
}

class MissingParamError extends Error {
  constructor (paramName: string) {
    super(`Missing param: ${paramName}`)
    this.name = 'MissingParamError'
  }
}

class ServerError extends Error {
  constructor (stack: string) {
    super('Internal server error')
    this.name = 'ServerError'
    this.stack = stack
  }
}

const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

type SutTypes = {
  sut: AddAccountController
  validationSpy: ValidationSpy
}

const makeSut = (): SutTypes => {
  const validationSpy = new ValidationSpy()
  const sut = new AddAccountController(validationSpy)
  return {
    sut,
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
})
