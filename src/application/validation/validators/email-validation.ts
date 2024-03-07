import { type EmailValidator, type Validation } from "@/application/contracts"

export class EmailValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly emailValidator: EmailValidator
  ) { }

  validate (input: Validation.Params): Validation.Result {
    this.emailValidator.isValid(input[this.fieldName])
    return new Error()
  }
}
