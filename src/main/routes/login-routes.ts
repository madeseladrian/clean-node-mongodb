import { Router } from 'express'
import { expressRouteAdapter } from '../adapter'
import { makeLoginController } from '../factories/login'
import { makeSignUpController } from '../factories/signup'

export default (router: Router): void => {
  router.post('/signup', expressRouteAdapter(makeSignUpController()))
  router.post('/login', expressRouteAdapter(makeLoginController()))
}
