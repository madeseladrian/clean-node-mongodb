import { type EmailValidator, type Validation } from "@/application/contracts"
import { InvalidParamError } from "@/application/errors"

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) { }

  validate (input: Validation.Params): Validation.Result {
    const isValid = this.emailValidator.isValid(input[this.fieldName])
    if (!isValid) {
      return new InvalidParamError(this.fieldName)
    }
  }
}
