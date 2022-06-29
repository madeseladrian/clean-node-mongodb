import { Authentication, AuthenticationModel } from '../../../domain/usecases'
import { HashComparer } from '../../protocols/cryptography'
import { LoadAccountByEmailRepository } from '../../protocols/db'

export class DbAuthentication implements Authentication {
  private readonly hashComparer: HashComparer
  private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository

  constructor (hashComparer: HashComparer, loadAccountByEmailRepository: LoadAccountByEmailRepository) {
    this.hashComparer = hashComparer
    this.loadAccountByEmailRepository = loadAccountByEmailRepository
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      await this.hashComparer.compare(authentication.password, account.password)
    }
    return null
  }
}
