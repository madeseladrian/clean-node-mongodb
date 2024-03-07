import { type EmailValidator } from "@/application/contracts/validation"

export class EmailValidatorSpy implements EmailValidator {
  isEmailValid = false
  email: string

  isValid (email: EmailValidator.Params): EmailValidator.Result {
    this.email = email
    return this.isEmailValid
  }
}
