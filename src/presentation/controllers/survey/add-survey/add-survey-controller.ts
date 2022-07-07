import { AddSurvey } from '../../../../domain/usecases'
import { badRequest, serverError } from '../../../helpers/http'
import { Controller, HttpRequest, HttpResponse, Validation } from '../../../protocols'

export class AddSurveyController implements Controller {
  constructor (
    private readonly addSurvey: AddSurvey,
    private readonly validation: Validation
  ) { }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { question, answers } = httpRequest.body
      await this.addSurvey.add({
        question,
        answers
      })
      return new Promise(resolve => resolve(null))
    } catch (error) {
      return serverError(error)
    }
  }
}
