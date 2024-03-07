import { faker } from '@faker-js/faker'

import { MissingParamError } from '@/application/errors'
import { ValidationComposite } from '@/application/validation/validators'

import { ValidationSpy } from '@/tests/infra/controllers/mocks'

const field = faker.word.noun()

type SutTypes = {
  sut: ValidationComposite
  validationSpies: ValidationSpy[]
}

const makeSut = (): SutTypes => {
  const validationSpies = [
    new ValidationSpy(),
    new ValidationSpy()
  ]
  const sut = new ValidationComposite(validationSpies)
  return {
    sut,
    validationSpies
  }
}

describe('ValidationComposite', () => {
  test('Should return an error if any validation fails', async () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: faker.word.noun() })
    expect(error).toEqual(validationSpies[1].error)
  })

  test('Should return the first error if more then one validation fails', () => {
    const { sut, validationSpies } = makeSut()
    validationSpies[0].error = new Error()
    validationSpies[1].error = new MissingParamError(field)
    const error = sut.validate({ [field]: faker.word.noun() })
    expect(error).toEqual(validationSpies[0].error)
  })

  test('Should not return if validation succeeds', () => {
    const { sut } = makeSut()
    const error = sut.validate({ [field]: faker.word.noun() })
    expect(error).toBeFalsy()
  })
})
