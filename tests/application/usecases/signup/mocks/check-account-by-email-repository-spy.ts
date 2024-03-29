import { type CheckAccountByEmailRepository } from '@/application/contracts/db/signup'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  result: CheckAccountByEmailRepository.Result = false

  async checkByEmail (email: CheckAccountByEmailRepository.Params): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}
