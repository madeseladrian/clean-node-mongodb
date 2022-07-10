import { HttpResponse } from '@/presentation/protocols'

export interface Controller<T = any> {
  handle: (resquest: T) => Promise<HttpResponse>
}
