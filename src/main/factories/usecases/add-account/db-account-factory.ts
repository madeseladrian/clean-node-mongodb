import { AddAccount } from '../../../../domain/usecases'
import { DbAddAccount } from '../../../../data/usecases/add-account'
import { AccountMongoRepository } from '../../../../infra/db/mongodb/account'
import { BCryptAdapter } from '../../../../infra/cryptography/bcrypt-adapter'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BCryptAdapter(salt)
  return new DbAddAccount(accountMongoRepository, bcryptAdapter)
}
