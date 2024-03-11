import { type HttpResponse } from '@/application/helpers'

export interface Controller<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
