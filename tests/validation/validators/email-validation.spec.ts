import { InvalidParamError } from '@/presentation/errors'
import { EmailValidation } from '@/validation/validators'
import { throwError } from '@/tests/domain/mocks'
import { EmailValidatorSpy } from '@/tests/validation/mocks'
import faker from 'faker'

const field = faker.random.word()

type SutTypes = {
  emailValidatorSpy: EmailValidatorSpy
  sut: EmailValidation
}

const makeSut = (): SutTypes => {
  const emailValidatorSpy = new EmailValidatorSpy()
  const sut = new EmailValidation(field, emailValidatorSpy)
  return {
    emailValidatorSpy,
    sut
  }
}

describe('Email Validation', () => {
  test('1 - Should return an error if EmailValidator returns false', () => {
    const { sut, emailValidatorSpy } = makeSut()
    emailValidatorSpy.isEmailValid = false
    const email = faker.internet.email()
    const error = sut.validate({ [field]: email })
    expect(error).toEqual(new InvalidParamError(field))
  })

  test('2 - Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorSpy } = makeSut()
    const email = faker.internet.email()
    sut.validate({ [field]: email })
    expect(emailValidatorSpy.email).toBe(email)
  })

  test('3 - Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorSpy } = makeSut()
    jest.spyOn(emailValidatorSpy, 'isValid').mockImplementationOnce(throwError)
    expect(sut.validate).toThrow()
  })
})
