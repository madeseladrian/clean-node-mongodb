import { SignUpController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import {
  makeDbAddAccount,
  makeDbAuthentication,
  makeLogControllerDecorator,
  makeSignUpValidation
} from '@/main/factories'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeDbAuthentication(),
    makeSignUpValidation()
  )
  return makeLogControllerDecorator(controller)
}
