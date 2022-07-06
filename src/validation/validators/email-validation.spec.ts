import { InvalidParamError } from '../../presentation/errors'
import { EmailValidator } from '../protocols'
import { EmailValidation } from '.'

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

interface SutTypes {
  emailValidatorStub: EmailValidator
  sut: EmailValidation
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    emailValidatorStub,
    sut
  }
}

describe('Email Validation', () => {
  test('1 - Should return  an error if EmailValidator returns false', () => {
    const { emailValidatorStub, sut } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email@example.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  })

  test('2 - Should call EmailValidator with correct email', () => {
    const { emailValidatorStub, sut } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@example.com' })
    expect(isValidSpy).toHaveBeenLastCalledWith('any_email@example.com')
  })

  test('3 - Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
