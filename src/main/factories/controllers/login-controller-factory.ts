import { LoginController } from '@/presentation/controllers'
import { Controller } from '@/presentation/protocols'
import {
  makeDbAuthentication,
  makeLogControllerDecorator,
  makeLoginValidation
} from '@/main/factories'

export const makeLoginController = (): Controller => {
  const controller = new LoginController(
    makeDbAuthentication(),
    makeLoginValidation()
  )
  return makeLogControllerDecorator(controller)
}
