import { loginValidationFactory } from '@/apis/factories/validation'
import { loginUseCaseFactory } from '@/apis/factories/usecases'

import { LoginController } from '@/infra/controllers'

import { type Controller } from '@/application/contracts/controller'

export const loginControllerFactory = (): Controller => {
  return new LoginController(loginUseCaseFactory(), loginValidationFactory())
}
