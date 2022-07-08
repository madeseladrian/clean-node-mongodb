import { AddSurveyController } from '../../../../../presentation/controllers/survey/add-survey'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators'
import { makeDbAddSurvey } from '../../../usecases/add-survey'
import { makeAddSurveyValidation } from './add-validation-validation-factory'

export const makeSurveyController = (): Controller => {
  const controller = new AddSurveyController(makeDbAddSurvey(), makeAddSurveyValidation())
  return makeLogControllerDecorator(controller)
}
