import { signUpValidationFactory } from '@/apis/factories/validation'

import { EmailValidatorAdapter } from '@/infra/validators'

import { type Validation } from '@/application/contracts/validation'
import {
  CompareFieldsValidation,
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/application/validation/validators'

jest.mock('@/application/validation/validators/validation-composite')

describe('signUpValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    signUpValidationFactory()
    const validations: Validation[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
