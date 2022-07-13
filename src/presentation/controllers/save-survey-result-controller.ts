import { Controller, HttpResponse } from '@/presentation/protocols'
import { forbidden } from '@/presentation/helpers'
import { InvalidParamError } from '@/presentation/errors'
import { LoadAnswersBySurvey } from '@/domain/usecases'

export class SaveSurveyResultController implements Controller {
  constructor (
    private readonly loadAnswersBySurvey: LoadAnswersBySurvey
  ) {}

  async handle (request: SaveSurveyResultController.Request): Promise<HttpResponse> {
    const { surveyId } = request
    const answers = await this.loadAnswersBySurvey.loadAnswers(surveyId)
    if (!answers.length) {
      return forbidden(new InvalidParamError('surveyId'))
    }
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
