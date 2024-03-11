import { type CheckAccountByEmailRepository } from '@/application/contracts/db/signup'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: string
  result: CheckAccountByEmailRepository.Result = false

  async checkByEmail (params: CheckAccountByEmailRepository.Params): Promise<CheckAccountByEmailRepository.Result> {
    this.email = params.email
    return this.result
  }
}
