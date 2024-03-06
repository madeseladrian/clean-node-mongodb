import { type Hasher } from '@/application/contracts/cryptography'
import {
  type AddAccountRepository,
  type CheckAccountByEmailRepository
} from '@/application/contracts/db/account'

import { type AddAccount } from '@/domain/add-account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher
  ) { }

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    const existsEmail = await this.checkAccountByEmailRepository.checkByEmail(params.email)
    let isValid = false

    if (!existsEmail) {
      const hashedPassword = await this.hasher.hash(params.password)
      isValid = await this.addAccountRepository.add({ ...params, password: hashedPassword })
    }

    return isValid
  }
}
