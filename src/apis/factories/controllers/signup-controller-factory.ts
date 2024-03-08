import { signUpValidationFactory } from '@/apis/factories/validation'
import { signUpUsecaseFactory } from '@/apis/factories/usecases'

import { type Controller } from '@/application/contracts/controller'
import { SignUpController } from '@/infra/controllers'

export const signUpControllerFactory = (): Controller => {
  return new SignUpController(
    signUpUsecaseFactory(),
    signUpValidationFactory()
  )
}
