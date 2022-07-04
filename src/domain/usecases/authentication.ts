import { AuthenticationModel } from '.'

export interface Authentication {
  auth (authentication: AuthenticationModel): Promise<string>
}
