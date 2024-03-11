import { type HttpResponse } from '@/application/helpers'

export namespace Controller {
  export type Request = any
  export type Response = HttpResponse
}

export interface Controller<T = Controller.Request> {
  handle: (request: T) => Promise<Controller.Response>
}
