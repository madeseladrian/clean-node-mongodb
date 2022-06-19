import { AccountModel } from '../models/account-model'
import { AddAccountModel } from '../models/add-account-model'

export interface AddAccount {
  add: (account: AddAccountModel) => Promise<AccountModel>
}
