import { Authentication } from '../../../../domain/usecases'
import { DbAuthentication } from '../../../../data/usecases/autentication'
import { BCryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter'
import { JwtAdapter } from '../../../../infra/cryptography/jwt-adapter'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account'
import env from '../../../config/env'

export const makeDbAuthentication = (): Authentication => {
  const salt = 12
  const bcrypt = new BCryptAdapter(salt)
  const accountMongoRepository = new AccountMongoRepository()
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  return new DbAuthentication(
    bcrypt,
    accountMongoRepository,
    jwtAdapter,
    accountMongoRepository
  )
}
