import { AuthenticationModel } from '../models'

export interface Authentication {
  auth (authentication: AuthenticationModel): Promise<string>
}
