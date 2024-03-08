import { signUpValidationFactory } from '@/apis/factories/validation'
import { signUpUsecaseFactory } from '@/apis/factories/usecases'

import { SignUpController } from '@/infra/controllers'

import { type Controller } from '@/application/contracts/controller'

export const signUpControllerFactory = (): Controller => {
  return new SignUpController(
    signUpUsecaseFactory(),
    signUpValidationFactory()
  )
}
