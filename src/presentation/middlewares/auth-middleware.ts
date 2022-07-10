import { AccessDeniedError } from '@/presentation/errors'
import { forbidden } from '@/presentation/helpers'
import { Middleware, HttpResponse } from '@/presentation/protocols'

export class AuthMiddleware implements Middleware {
  async handle (request: AuthMiddleware.Request): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}

export namespace AuthMiddleware {
  export type Request = {
    accessToken?: string
  }
}
