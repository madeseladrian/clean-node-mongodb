import { DbAddAccount } from '../../data/usecases/add-account'
import { SignUpController } from '../../presentation/controllers/signup'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository'
import { BCryptAdapter } from '../../infra/cryptography'
import { EmailValidatorAdapter } from '../../utils'
import { Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decorators'
import { LogMongoRepository } from '../../infra/log-repository'
import { makeSignUpValidation } from '.'

export const makeSignUpController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BCryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(accountMongoRepository, bcryptAdapter)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const signUpController = new SignUpController(
    dbAddAccount,
    emailValidatorAdapter,
    makeSignUpValidation()
  )
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(signUpController, logMongoRepository)
}
