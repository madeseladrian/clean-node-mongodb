import { MissingParamError } from '../../errors'
import { Validation, ValidationComposite } from '.'



describe('Validation Composite', () => {
  test('1 - Should return n error if any vlidation fails', () => {
    class ValidationStub implements Validation {
      validate (input: any): Error {
        return new MissingParamError('field')
      }
    }
    const validationStub = new ValidationStub()
    const sut = new ValidationComposite([validationStub])
    const error = sut.validate({ field: 'any_value' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
