import { LoginController } from '../../../../../presentation/controllers/login/login'
import { Controller } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators'
import { makeDbAuthentication } from '../../../usecases/authentication'
import { makeLoginValidation } from '.'

export const makeLoginController = (): Controller => {
  return makeLogControllerDecorator(
    new LoginController(
      makeDbAuthentication(),
      makeLoginValidation()
    )
  )
}
