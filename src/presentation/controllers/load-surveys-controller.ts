import { Controller, HttpResponse } from '@/presentation/protocols'
import { LoadSurveys } from '@/domain/usecases'
import { ok } from '@/presentation/helpers'

export class LoadSurveysController implements Controller {
  constructor (private readonly loadSurveys: LoadSurveys) {}

  async handle (request: LoadSurveysController.Request): Promise<HttpResponse> {
    const surveys = await this.loadSurveys.load(request.accountId)
    return ok(surveys)
  }
}

export namespace LoadSurveysController {
  export type Request = {
    accountId: string
  }
}
