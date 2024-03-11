import { type Hasher } from '@/application/contracts/cryptography'
import {
  type SignUpRepository,
  type CheckAccountByEmailRepository
} from '@/application/contracts/db/signup'

import { type SignUp } from '@/domain/entities/signup'

export class SignUpUseCase implements SignUp {
  constructor (
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository,
    private readonly hasher: Hasher,
    private readonly signUpRepository: SignUpRepository
  ) { }

  async add (params: SignUp.Params): Promise<SignUp.Result> {
    const existsEmail = await this.checkAccountByEmailRepository.checkByEmail({ email: params.email })
    let isValid = false

    if (!existsEmail) {
      const hashedPassword = await this.hasher.hash({ plaintext: params.password })
      isValid = await this.signUpRepository.add({ ...params, password: hashedPassword })
    }

    return isValid
  }
}
