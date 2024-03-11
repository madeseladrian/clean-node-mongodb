import { type Validation } from '@/application/contracts'
import { InvalidParamError } from '@/application/errors'

export class CompareFieldsValidation implements Validation {
  constructor (
    private readonly fieldName: string,
    private readonly fieldToCompareName: string
  ) {}

  validate (params: Validation.Params): Validation.Result {
    if (params[this.fieldName] !== params[this.fieldToCompareName]) {
      return new InvalidParamError(this.fieldToCompareName)
    }
  }
}
