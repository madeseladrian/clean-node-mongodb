import { EmailValidatorAdapter } from '@/infra/validators'

import { type Validation } from '@/application/contracts/validation'
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/application/validation/validators'

export const loginValidationFactory = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['email', 'password']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
