import { type UpdateAccessTokenRepository } from '@/application/contracts/db/login'

export class UpdateAccessTokenRepositorySpy implements UpdateAccessTokenRepository {
  id: string
  token: string

  async updateAccessToken (params: UpdateAccessTokenRepository.Params): Promise<void> {
    this.id = params.id
    this.token = params.token
  }
}
