import { type AddAccount } from "@/domain/add-account"

export class AddAccountSpy implements AddAccount {
  params: AddAccount.Params
  result = false

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    this.params = params
    return this.result
  }
}
