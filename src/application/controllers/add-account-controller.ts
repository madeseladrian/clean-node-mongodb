import { type Controller, type Validation } from "@/application/contracts/protocols"
import { badRequest, forbidden, serverError, type HttpResponse } from "@/application/helpers"
import { EmailInUseError } from "@/application/errors"

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
      const isValid = await this.addAccount.add({
        name,
        email,
        password
      })
      if (!isValid) {
        return forbidden(new EmailInUseError())
      }
      return null
    } catch (error) {
      return serverError(error)
    }
  }
}
