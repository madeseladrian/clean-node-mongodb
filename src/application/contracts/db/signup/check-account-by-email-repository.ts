export namespace CheckAccountByEmailRepository {
  export type Params = {
    email: string
  }
  export type Result = boolean
}

export interface CheckAccountByEmailRepository {
  checkByEmail: (params: CheckAccountByEmailRepository.Params) =>
    Promise<CheckAccountByEmailRepository.Result>
}
