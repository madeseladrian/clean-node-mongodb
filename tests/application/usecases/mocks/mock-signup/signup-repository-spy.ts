import { type SignUpRepository } from '@/application/contracts/db/signup'

export class SignUpRepositorySpy implements SignUpRepository {
  params: SignUpRepository.Params
  result: SignUpRepository.Result = false

  async add (params: SignUpRepository.Params): Promise<SignUpRepository.Result> {
    this.params = params
    return this.result
  }
}
