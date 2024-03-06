import { faker } from "@faker-js/faker"

import { MissingParamError } from "@/application/errors"
import { RequiredFieldValidation } from "@/application/validation/validators"

const field = faker.word.noun()

const makeSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation(field)
}

describe('RequiredFieldValidation', () => {
  test('Should return a MissingParamError if validation fails', async () => {
    const sut = makeSut()
    const error = sut.validate({ invalidField: faker.word.noun() })
    expect(error).toEqual(new MissingParamError(field))
  })

  test('Should not return if validation succeeds', async () => {
    const sut = makeSut()
    const error = sut.validate({ [field]: faker.word.noun() })
    expect(error).toBeFalsy()
  })
})
