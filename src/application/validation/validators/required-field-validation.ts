import { type Validation } from '@/application/contracts'
import { MissingParamError } from '@/application/errors'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) { }

  validate (params: Validation.Params): Validation.Result {
    if (!params[this.fieldName]) {
      return new MissingParamError(this.fieldName)
    }
  }
}
