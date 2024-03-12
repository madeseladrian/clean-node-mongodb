import { type Router } from 'express'

import { adaptRoute } from '@/apis/adapters'
import { loginControllerFactory, signUpControllerFactory } from '@/apis/factories/controllers'

export default (route: Router): void => {
  route.post('/signup', adaptRoute(signUpControllerFactory()))
  route.post('/login', adaptRoute(loginControllerFactory()))
}
