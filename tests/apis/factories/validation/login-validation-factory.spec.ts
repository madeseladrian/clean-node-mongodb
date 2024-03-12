import { loginValidationFactory } from '@/apis/factories/validation'

import { EmailValidatorAdapter } from '@/infra/validators'

import { type Validation } from '@/application/contracts/validation'
import {
  EmailValidation,
  RequiredFieldValidation,
  ValidationComposite
} from '@/application/validation/validators'

jest.mock('@/application/validation/validators/validation-composite')

describe('loginValidationFactory', () => {
  test('Should call ValidationComposite with all validations', () => {
    loginValidationFactory()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
