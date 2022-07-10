import { adaptRoute } from '@/main/adapters'
import { makeSurveyController } from '@/main/factories'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makeSurveyController()))
}
