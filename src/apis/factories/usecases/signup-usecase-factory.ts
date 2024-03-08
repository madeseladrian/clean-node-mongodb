import { BcryptAdapter } from '@/infra/cryptography'
import {
  SignUpRepositoryMongo,
  CheckAccountByEmailRepositoryMongo
} from '@/infra/db/mongodb/signup'

import { SignUpUsecase } from '@/application/usecases/signup'

import { type SignUp } from '@/domain/entities/signup'

export const signUpUsecaseFactory = (): SignUp => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const checkAccountByEmailRepositoryMongo = new CheckAccountByEmailRepositoryMongo()
  const signUpRepositoryMongo = new SignUpRepositoryMongo()
  return new SignUpUsecase(
    checkAccountByEmailRepositoryMongo,
    bcryptAdapter,
    signUpRepositoryMongo
  )
}
