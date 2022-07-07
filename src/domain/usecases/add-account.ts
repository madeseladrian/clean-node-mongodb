import { AccountModel, AddAccountModel } from '../models'

export interface AddAccount {
  add (account: AddAccountModel): Promise<AccountModel>
}
