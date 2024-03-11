import { type EmailValidator } from '@/application/contracts/validation'

export class EmailValidatorSpy implements EmailValidator {
  isEmailValid = false
  email: string

  isValid (params: EmailValidator.Params): EmailValidator.Result {
    this.email = params.email
    return this.isEmailValid
  }
}
