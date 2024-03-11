import { badRequest } from '@/infra/http'

import { type Controller } from '@/application/contracts/controller'
import { type Validation } from '@/application/contracts/validation'

export namespace LoginController {
  export type Request = {
    email: string
    password: string
  }
}

export class LoginController implements Controller {
  constructor (
    private readonly validation: Validation
  ) {}

  async handle (request: LoginController.Request): Promise<Controller.Response> {
    const error = this.validation.validate(request)
    if (error) {
      return badRequest(error)
    }
  }
}
