import { Authentication, AuthenticationModel } from '../../../domain/usecases'
import { HashComparer, TokenGenerator } from '../../protocols/cryptography'
import { LoadAccountByEmailRepository } from '../../protocols/db'

export class DbAuthentication implements Authentication {
  private readonly hashComparer: HashComparer
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository
  private readonly tokenGenerator: TokenGenerator

  constructor (
    hashComparer: HashComparer,
    loadAccountByEmailRepository: LoadAccountByEmailRepository,
    tokenGenerator: TokenGenerator
  ) {
    this.hashComparer = hashComparer
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
    this.tokenGenerator = tokenGenerator
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
      await this.tokenGenerator.generate(account.id)
    }
    return null
  }
}
