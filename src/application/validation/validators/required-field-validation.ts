import { type Validation } from '@/application/contracts'
import { MissingParamError } from '@/application/errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (input: Validation.Params): Validation.Result {
    if (!input[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
