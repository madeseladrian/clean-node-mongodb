import { HttpRequest, HttpResponse } from '.'

export interface Controller {
  handle (httpResquest: HttpRequest): Promise<HttpResponse>
}
