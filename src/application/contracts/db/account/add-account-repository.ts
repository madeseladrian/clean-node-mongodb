import { type AddAccount } from '@/domain/add-account'

export namespace AddAccountRepository {
  export type Params = AddAccount.Params
  export type Result = AddAccount.Result
}

export interface AddAccountRepository {
  add: (params: AddAccountRepository.Params) => Promise<AddAccountRepository.Result>
}
