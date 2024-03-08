import { type Controller, type Validation } from '@/application/contracts'
import {
  ok,
  badRequest,
  forbidden,
  serverError
} from '@/infra/http'
import { EmailInUseError } from '@/application/errors'

import { type SignUp } from '@/domain/entities/signup'

export namespace SignUpController {
  export type Params = {
    name: string
    email: string
    password: string
    passwordConfirmation: string
  }
}

export class SignUpController implements Controller<SignUpController.Params> {
  constructor (
    private readonly signUp: SignUp,
    private readonly validation: Validation
  ) { }

  async handle (request: SignUpController.Params): Promise<Controller.Result> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const { name, email, password } = request
      const isValid = await this.signUp.add({
        name,
        email,
        password
      })
      if (!isValid) {
        return forbidden(new EmailInUseError())
      }
      return ok(isValid)
    } catch (error) {
      return serverError(error)
    }
  }
}
