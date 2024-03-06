import { faker } from "@faker-js/faker"

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
    this.validation.validate(request)
    return null
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
})
