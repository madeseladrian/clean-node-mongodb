export namespace CheckAccountByEmailRepository {
  export type Params = string
  export type Result = boolean
}

export interface CheckAccountByEmailRepository {
  checkByEmail: (email: CheckAccountByEmailRepository.Params) =>
    Promise<CheckAccountByEmailRepository.Result>
}
