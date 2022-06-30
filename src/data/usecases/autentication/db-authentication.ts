import { Authentication, AuthenticationModel } from '../../../domain/usecases'
import { HashComparer, Encrypter } from '../../protocols/cryptography'
import {
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository
} from '../../protocols/db'

export class DbAuthentication implements Authentication {
  private readonly hashComparer: HashComparer
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly tokenGenerator: Encrypter
  private readonly updateAccessTokenRepository: UpdateAccessTokenRepository

  constructor (
    hashComparer: HashComparer,
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    tokenGenerator: Encrypter,
    updateAccessTokenRepository: UpdateAccessTokenRepository
  ) {
    this.hashComparer = hashComparer
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.tokenGenerator = tokenGenerator
    this.updateAccessTokenRepository = updateAccessTokenRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.encrypt(account.id)
        await this.updateAccessTokenRepository.updateAccessToken(account.id, accessToken)
        return accessToken
      }
    }
    return null
  }
}
