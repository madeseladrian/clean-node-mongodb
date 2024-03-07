import { type Validation } from "@/application/contracts"

export class ValidationComposite implements Validation {
  constructor (private readonly validations: Validation[]) {}

  validate (input: Validation.Params): Validation.Result {
    for (const validation of this.validations) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
