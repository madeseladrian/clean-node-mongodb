import { AddSurveyModel } from '../../../../domain/models'

export interface AddSurveyRepository {
  add (surveyData: AddSurveyModel): Promise<void>
}
