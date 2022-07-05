import { SignUpController } from '../../../../presentation/controllers/signup'
import { Controller } from '../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../decorators'
import { makeDbAddAccount } from '../../usecases/add-account'
import { makeDbAuthentication } from '../../usecases/authentication'
import { makeSignUpValidation } from '.'

export const makeSignUpController = (): Controller => {
  return makeLogControllerDecorator(
    new SignUpController(
      makeDbAddAccount(),
      makeDbAuthentication(),
      makeSignUpValidation()
    )
  )
}
