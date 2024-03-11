import {
  type Encrypter,
  type HashComparer
} from '@/application/contracts/cryptography'
import {
  type UpdateAccessTokenRepository,
  type LoadAccountByEmailRepository
} from '@/application/contracts/db/login'

import { type Login } from '@/domain/entities/login'

export class LoginUseCase implements Login {
  constructor (
    private readonly encrypter: Encrypter,
    private readonly hashComparer: HashComparer,
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {}

  async auth (loginParams: Login.Params): Promise<Login.Result> {
    const account = await this.loadAccountByEmailRepository.loadByEmail({
      email: loginParams.email
    })
    if (!account) {
      return null
    }
    const isValid = await this.hashComparer.compare({
      plaintext: loginParams.password,
      digest: account.password
    })
    if (!isValid) {
      return null
    }
    const accessToken = await this.encrypter.encrypt({ plaintext: account.id })
    await this.updateAccessTokenRepository.updateAccessToken({
      id: account.id,
      token: accessToken
    })
    return {
      accessToken,
      name: account.name
    }
  }
}
