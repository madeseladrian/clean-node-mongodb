import { type CheckAccountByEmailRepository } from '@/application/contracts/db/add-account'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: CheckAccountByEmailRepository.Params
  result: CheckAccountByEmailRepository.Result = false

  async checkByEmail (email: CheckAccountByEmailRepository.Params): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}
