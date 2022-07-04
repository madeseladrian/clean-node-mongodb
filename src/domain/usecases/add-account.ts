import { AccountModel } from '../models'
import { AddAccountModel } from '.'

export interface AddAccount {
  add (account: AddAccountModel): Promise<AccountModel>
}
