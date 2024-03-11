export namespace Login {
  export type Params = {
    email: string
    password: string
  }

  export type Result = {
    accessToken: string
    name: string
  }
}

export interface Login {
  auth: (params: Login.Params) => Promise<Login.Result>
}
