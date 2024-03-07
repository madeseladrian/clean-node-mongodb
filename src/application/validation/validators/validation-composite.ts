import { type Validation } from "@/application/contracts"

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (input: Validation.Params): Validation.Result {
    return this.validations.map(
      validation => validation.validate(input)
    ).find(error => error)
  }
}
