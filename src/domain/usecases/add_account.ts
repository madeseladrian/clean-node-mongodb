import { AccountModel } from '../models/account_model'

export interface AddAccountModel {
  name: string
  email: string
  password: string
}

export interface AddAccount {
  add: (account: AddAccountModel) => AccountModel
}
