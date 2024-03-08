export namespace LoadAccountByEmailRepository {
  export type Params = {
    email: string
  }

  export type Result = {
    id: string
    name: string
    password: string
  }
}

export interface LoadAccountByEmailRepository {
  loadByEmail: (email: LoadAccountByEmailRepository.Params)
    => Promise<LoadAccountByEmailRepository.Result>
}
