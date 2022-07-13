import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadAnswersBySurvey } from '@/domain/usecases'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadAnswersBySurvey: LoadAnswersBySurvey
  ) {}

  async handle (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    const { surveyId } = request
    await this.loadAnswersBySurvey.loadAnswers(surveyId)
    return null
  }
}

export namespace SaveSurveyResultController {
  export type Request = {
    surveyId: string
    answer: string
    accountId: string
  }
}
