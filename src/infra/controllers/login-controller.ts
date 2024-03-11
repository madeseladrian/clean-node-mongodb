import { badRequest, ok, serverError, unauthorized } from '@/infra/http'

import { type Controller } from '@/application/contracts/controller'
import { type Validation } from '@/application/contracts/validation'

import { type Login } from '@/domain/entities/login'

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}

export class LoginController implements Controller {
  constructor (
    private readonly login: Login,
    private readonly validation: Validation
  ) {}

  async handle (request: LoginController.Request): Promise<Controller.Response> {
    try {
      const error = this.validation.validate(request)
      if (error) {
        return badRequest(error)
      }
      const authenticationModel = await this.login.auth(request)
      if (!authenticationModel) {
        return unauthorized()
      }
      return ok(authenticationModel)
    } catch (error) {
      return serverError(error)
    }
  }
}
