import env from '@/apis/config/env'

import { EncrypterAdapter, HashComparerAdapter } from '@/infra/cryptography'
import {
  LoadAccountByEmailRepositoryMongo,
  UpdateAccessTokenRepositoryMongo
} from '@/infra/db/mongodb/login'

import { LoginUseCase } from '@/application/usecases/login'

import { type Login } from '@/domain/entities/login'

export const loginUseCaseFactory = (): Login => {
  const encrypterAdapter = new EncrypterAdapter(env.jwtSecret)
  const hashComparerAdapter = new HashComparerAdapter()
  const loadAccountByEmailRepository = new LoadAccountByEmailRepositoryMongo()
  const updateAccessTokenRepository = new UpdateAccessTokenRepositoryMongo()
  return new LoginUseCase(
    encrypterAdapter,
    hashComparerAdapter,
    loadAccountByEmailRepository,
    updateAccessTokenRepository
  )
}
