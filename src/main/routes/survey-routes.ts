import { Router } from 'express'
import { expressRouteAdapter } from '../adapter/express'
import { makeSurveyController } from '../factories/controllers/survey/add-survey'

export default (router: Router): void => {
  router.post('/surveys', expressRouteAdapter(makeSurveyController()))
}
