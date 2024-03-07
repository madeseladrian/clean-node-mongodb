import { type HttpResponse } from '@/application/helpers'

export namespace Controller {
  export type Params = any
  export type Result = HttpResponse
}

export interface Controller<T = Controller.Params> {
  handle: (request: T) => Promise<Controller.Result>
}
