import { DbAuthentication } from '../../../data/usecases/autentication'
import { LoginController } from '../../../presentation/controllers/login'
import { Controller } from '../../../presentation/protocols'
import { BCryptAdapter } from '../../../infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '../../../infra/cryptography/jwt-adapter'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account'
import { LogMongoRepository } from '../../../infra/db/mongodb/log'
import { LogControllerDecorator } from '../../decorators'
import { makeLoginValidation } from '.'
import env from '../../config/env'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bcrypt = new BCryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const dbAuthentication = new DbAuthentication(
    bcrypt,
    accountMongoRepository,
    jwtAdapter,
    accountMongoRepository
  )
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
