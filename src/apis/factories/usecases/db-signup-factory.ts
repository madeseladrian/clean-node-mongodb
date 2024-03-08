import { BcryptAdapter } from '@/infra/cryptography'
import { SignUpMongoRepository } from '@/infra/db/mongodb/signup'

import { DbSignUp } from '@/application/usecases/signup'

import { type SignUp } from '@/domain/entities/signup'

export const dbSignUpFactory = (): SignUp => {
  const salt = 12
  const bcryptAdapter = new BcryptAdapter(salt)
  const signUpMongoRepository = new SignUpMongoRepository()
  return new DbSignUp(
    signUpMongoRepository,
    signUpMongoRepository,
    bcryptAdapter
  )
}
