import { Router } from 'express'
import { expressRouteAdapter } from '../adapter/express'
import { makeLoginController } from '../factories/controllers/login'
import { makeSignUpController } from '../factories/controllers/signup'

export default (router: Router): void => {
  router.post('/signup', expressRouteAdapter(makeSignUpController()))
  router.post('/login', expressRouteAdapter(makeLoginController()))
}
