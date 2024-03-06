import { type CheckAccountByEmailRepository } from '@/application/contracts/db/account'
import { type AddAccount } from '@/domain/add-account'

export class DbAddAccount implements AddAccount {
  constructor (
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) { }

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    await this.checkAccountByEmailRepository.checkByEmail(params.email)
    return false
  }
}
