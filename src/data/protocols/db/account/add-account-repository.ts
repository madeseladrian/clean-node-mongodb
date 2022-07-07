import { AccountModel, AddAccountModel } from '../../../../domain/models'

export interface AddAccountRepository {
  add (accountData: AddAccountModel): Promise<AccountModel>
}
