import { faker } from "@faker-js/faker"

import { InvalidParamError } from "@/application/errors"
import { CompareFieldsValidation } from "@/application/validation/validators"

const field = faker.word.noun()
const fieldToCompare = faker.word.noun()

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation(field, fieldToCompare)
}

describe('CompareFieldsValidation', () => {
  test('Should return an InvalidParamError if validation fails', async () => {
    const sut = makeSut()
    const error = sut.validate({
      [field]: faker.word.noun(),
      [fieldToCompare]: faker.word.noun()
    })
    expect(error).toEqual(new InvalidParamError(fieldToCompare))
  })

  test('Should not return if validation succeeds', async () => {
    const sut = makeSut()
    const value = faker.word.noun()
    const error = sut.validate({
      [field]: value,
      [fieldToCompare]: value
    })
    expect(error).toBeFalsy()
  })
})
