import { SaveSurveyResult } from '@/domain/usecases'
import { mockSurveyResultModel } from '@/tests/domain/mocks'

export class SaveSurveyResultSpy implements SaveSurveyResult {
  params: SaveSurveyResult.Params
  result = mockSurveyResultModel()

  async save (params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Result> {
    this.params = params
    return this.result
  }
}
