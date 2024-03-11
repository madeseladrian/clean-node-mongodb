import { type Encrypter, type HashComparer } from '@/application/contracts/cryptography'
import { type LoadAccountByEmailRepository } from '@/application/contracts/db/login'
import { type Login } from '@/domain/entities/login'

export class LoginUseCase implements Login {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly hashComparer: HashComparer,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  ) {}

  async auth (loginParams: Login.Params): Promise<Login.Result> {
    const loadAccountByEmailRepositoryParams: LoadAccountByEmailRepository.Params = {
      email: loginParams.email
    }
    const account = await this.loadAccountByEmailRepository.loadByEmail(loadAccountByEmailRepositoryParams)
    if (account) {
      const hashComparerParams: HashComparer.Params = {
        plaintext: loginParams.password,
        digest: account.password
      }
      await this.hashComparer.compare(hashComparerParams)
      const encrypterParams: Encrypter.Params = { plaintext: account.id }
      await this.encrypter.encrypt(encrypterParams)
    }
    return null
  }
}
