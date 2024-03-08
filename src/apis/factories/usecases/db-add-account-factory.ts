import { BcryptAdapter } from '@/infra/cryptography'
import { AddAccountMongoRepository } from '@/infra/db/mongodb/add-account'

import { DbAddAccount } from '@/application/usecases/db-add-account'

import { type AddAccount } from '@/domain/entities/add-account'

export const dbAddAccountFactory = (): AddAccount => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const accountMongoRepository = new AddAccountMongoRepository()
  return new DbAddAccount(
    accountMongoRepository,
    accountMongoRepository,
    bcryptAdapter
  )
}
