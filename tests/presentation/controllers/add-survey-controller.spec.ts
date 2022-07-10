import { AddSurveyController } from '@/presentation/controllers'
import { badRequest, noContent, serverError } from '@/presentation/helpers'
import { throwError } from '@/tests/domain/mocks'
import { AddSurveySpy, ValidationSpy } from '@/tests/presentation/mocks'
import faker from 'faker'

const mockRequest = (): AddSurveyController.Request => ({
  question: faker.random.words(),
  answers: [{
    image: faker.image.imageUrl(),
    answer: faker.random.word()
  }]
})

type SutTypes = {
  sut: AddSurveyController
  validationSpy: ValidationSpy
  addSurveySpy: AddSurveySpy
}

const makeSut = (): SutTypes => {
  const addSurveySpy = new AddSurveySpy()
  const validationSpy = new ValidationSpy()
  const sut = new AddSurveyController(addSurveySpy, validationSpy)
  return {
    addSurveySpy,
    validationSpy,
    sut
  }
}

describe('AddSurvey Controller', () => {
  test('1 - Should call Validation with correct values', async () => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('2 - Should return 400 if Validation fails', async () => {
    const { sut, validationSpy } = makeSut()
    validationSpy.error = new Error()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(badRequest(validationSpy.error))
  })

  test('3 - Should calls AddSurvey with correct values', async () => {
    const { sut, addSurveySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addSurveySpy.params).toEqual({ ...request, date: new Date() })
  })

  test('4 - Should return 500 if AddSurvey throws', async () => {
    const { sut, addSurveySpy } = makeSut()
    jest.spyOn(addSurveySpy, 'add').mockImplementationOnce(throwError)
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('5 - Should return 204 on success', async () => {
    const { sut } = makeSut()
    const htttpResponse = await sut.handle(mockRequest())
    expect(htttpResponse).toEqual(noContent())
  })
})
