import { type Controller, type Validation } from "@/application/contracts/protocols"
import { badRequest, serverError, type HttpResponse } from "@/application/helpers"

import { type AddAccount } from "@/domain/add-account"

export namespace AddAccountController {
  export type Request = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}

export class AddAccountController implements Controller<AddAccountController.Request> {
  constructor (
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) { }

  async handle (request: AddAccountController.Request): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = request
      await this.addAccount.add({
        name,
        email,
        password
      })
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
