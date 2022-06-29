import { AccountModel } from '../../../domain/models'
import { AddAccount, AddAccountModel } from '../../../domain/usecases'
import { Encrypter } from '../../protocols/cryptography'
import { AddAccountRepository } from '../../protocols/db'

export class DbAddAccount implements AddAccount {
  private readonly addAccountRepository: AddAccountRepository
  private readonly encrypter: Encrypter

  constructor (addAccountRepository: AddAccountRepository, encrypter: Encrypter) {
    this.addAccountRepository = addAccountRepository
    this.encrypter = encrypter
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    const account = await this.addAccountRepository.add(Object.assign({}, accountData, { password: hashedPassword }))
    return account
  }
}
