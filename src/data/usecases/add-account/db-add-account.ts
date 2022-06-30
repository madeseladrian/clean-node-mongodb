import { AccountModel } from '../../../domain/models'
import { AddAccount, AddAccountModel } from '../../../domain/usecases'
import { Hasher } from '../../protocols/cryptography'
import { AddAccountRepository } from '../../protocols/db/account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly addAccountRepository: AddAccountRepository,
    private readonly hasher: Hasher
  ) {}

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.hasher.hash(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
