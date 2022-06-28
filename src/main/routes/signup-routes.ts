import { Router } from 'express'
import { expressRouteAdapter } from '../adapter'
import { makeSignUpController } from '../factories'

export default (router: Router): void => {
  router.post('/signup', expressRouteAdapter(makeSignUpController()))
}
