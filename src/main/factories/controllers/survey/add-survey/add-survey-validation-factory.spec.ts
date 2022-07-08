import { Validation } from '../../../../../presentation/protocols'
import {
  RequiredFieldValidation,
  ValidationComposite
} from '../../../../../validation/validators'
import { makeAddSurveyValidation } from './add-validation-validation-factory'

jest.mock('../../../../../validation/validators/validation-composite')

describe('AddSurvey Validation Factory', () => {
  test('1 - Should cal ValidationComposite ith all validations', () => {
    makeAddSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
