import { adaptRoute } from '@/main/adapters'
import { makeAddSurveyController } from '@/main/factories'
import { adminAuth } from '@/main/middlewares'
import { Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
}
