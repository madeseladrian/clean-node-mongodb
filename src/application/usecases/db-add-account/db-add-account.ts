import { type Hasher } from '@/application/contracts/cryptography'
import { type CheckAccountByEmailRepository } from '@/application/contracts/db/account'

import { type AddAccount } from '@/domain/add-account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher
  ) { }

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    await this.checkAccountByEmailRepository.checkByEmail(params.email)
    await this.hasher.hash(params.password)
    return false
  }
}
