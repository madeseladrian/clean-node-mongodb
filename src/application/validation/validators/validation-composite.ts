import { type Validation } from '@/application/contracts'

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (params: Validation.Params): Validation.Result {
    return this.validations.map(
      validation => validation.validate(params)
    ).find(error => error)
  }
}
