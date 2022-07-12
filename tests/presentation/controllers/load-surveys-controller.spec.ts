import { LoadSurveysController } from '@/presentation/controllers'
import { ok } from '@/presentation/helpers'
import { LoadSurveysSpy } from '@/tests/presentation/mocks'
import MockDate from 'mockdate'
import faker from 'faker'

const mockRequest = (): LoadSurveysController.Request => ({ accountId: faker.datatype.uuid() })

type SutTypes = {
  sut: LoadSurveysController
  loadSurveysSpy: LoadSurveysSpy
}

const makeSut = (): SutTypes => {
  const loadSurveysSpy = new LoadSurveysSpy()
  const sut = new LoadSurveysController(loadSurveysSpy)
  return {
    sut,
    loadSurveysSpy
  }
}

describe('LoadSurveys Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('1 - Should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(loadSurveysSpy.accountId).toBe(request.accountId)
  })

  test('2 - Should return 200 on success', async () => {
    const { sut, loadSurveysSpy } = makeSut()
    const httpResponse = await sut.handle(mockRequest())
    expect(httpResponse).toEqual(ok(loadSurveysSpy.result))
  })
})
