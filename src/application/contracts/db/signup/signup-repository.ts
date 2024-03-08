import { type SignUp } from '@/domain/entities/signup'

export namespace SignUpRepository {
  export type Params = SignUp.Params
  export type Result = SignUp.Result
}

export interface SignUpRepository {
  add: (params: SignUpRepository.Params) => Promise<SignUpRepository.Result>
}
