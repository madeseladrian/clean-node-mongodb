import { type HttpResponse } from "@/infra/helpers"

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
