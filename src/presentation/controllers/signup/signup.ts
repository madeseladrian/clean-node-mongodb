import { AddAccount } from '../../../domain/usecases'
import { InvalidParamError } from '../../errors'
import { badRequest, serverError, success } from '../../helpers'
import { Validation } from '../../helpers/validators'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class SignUpController implements Controller {
  private readonly addAccount: AddAccount
  private readonly emailValidator: EmailValidator
  private readonly validation: Validation

  constructor (addAccount: AddAccount, emailValidator: EmailValidator, validation: Validation) {
    this.addAccount = addAccount
    this.emailValidator = emailValidator
    this.validation = validation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = httpRequest.body

      const isValid = this.emailValidator.isValid(email)
      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }

      const account = await this.addAccount.add({ name, email, password })
      return success(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
