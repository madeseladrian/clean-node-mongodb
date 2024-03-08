import { type SignUp } from '@/domain/entities/signup'

export class SignUpSpy implements SignUp {
  params: SignUp.Params
  result = false

  async add (params: SignUp.Params): Promise<SignUp.Result> {
    this.params = params
    return this.result
  }
}
