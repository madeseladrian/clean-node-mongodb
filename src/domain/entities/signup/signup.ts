export namespace SignUp {
  export type Params = {
    name: string
    email: string
    password: string
  }

  export type Result = boolean
}

export interface SignUp {
  add: (params: SignUp.Params) => Promise<SignUp.Result>
}
