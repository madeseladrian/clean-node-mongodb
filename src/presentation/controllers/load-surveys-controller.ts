import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadSurveys } from '@/domain/usecases'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (request: LoadSurveysController.Request): Promise<HttpResponse> {
    await this.loadSurveys.load(request.accountId)
    return null
  }
}

export namespace LoadSurveysController {
  export type Request = {
    accountId: string
  }
}
