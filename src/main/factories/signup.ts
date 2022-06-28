import { DbAddAccount } from '../../data/usecases/add-account'
import { SignUpController } from '../../presentation/controllers/signup'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository'
import { BCryptAdapter } from '../../infra/cryptography'
import { EmailValidatorAdapter } from '../../utils'

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BCryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(accountMongoRepository, bcryptAdapter)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  return new SignUpController(dbAddAccount, emailValidatorAdapter)
}
