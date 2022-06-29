import { Authentication } from '../../../domain/usecases'
import { InvalidParamError, MissingParamError } from '../../errors'
import { badRequest, serverError } from '../../helpers'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../../protocols'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly emailValidation: EmailValidator

  constructor (authentication: Authentication, emailValidation: EmailValidator) {
    this.authentication = authentication
    this.emailValidation = emailValidation
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { email, password } = httpRequest.body
      if (!email) {
        return new Promise(resolve => resolve(
          badRequest(new MissingParamError('email'))
        ))
      }
      if (!password) {
        return new Promise(resolve => resolve(
          badRequest(new MissingParamError('password'))
        ))
      }
      const isValid = this.emailValidation.isValid(email)
      if (!isValid) {
        return new Promise(resolve => resolve(badRequest(new InvalidParamError('email'))))
      }
      await this.authentication.auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
