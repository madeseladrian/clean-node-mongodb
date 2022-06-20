import {
  AccountModel,
  AddAccountModel,
  AddAccount,
  Encrypter
} from './db-add-account-protocols'

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter
  private readonly addAccountRepository: AddAccount

  constructor (encrypter: Encrypter, addAccountRepository: AddAccount) {
    this.encrypter = encrypter
    this.addAccountRepository = addAccountRepository
  }

  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    )
    return new Promise(resolve => resolve(null))
  }
}
