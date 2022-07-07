import { AddSurveyModel } from '../models'

export interface AddSurvey {
  add (data: AddSurveyModel): Promise<void>
}
