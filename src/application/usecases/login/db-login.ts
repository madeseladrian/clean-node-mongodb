import { type LoadAccountByEmailRepository } from '@/application/contracts/db/login'
import { type Login } from '@/domain/entities/login'

export class DbLogin {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (loginParams: Login.Params): Promise<void> {
    const params: LoadAccountByEmailRepository.Params = {
      email: loginParams.email
    }
    await this.loadAccountByEmailRepository.loadByEmail(params)
  }
}
