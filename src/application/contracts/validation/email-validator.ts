export namespace EmailValidator {
  export type Params = {
    email: string
  }

  export type Result = boolean
}

export interface EmailValidator {
  isValid: (params: EmailValidator.Params) => EmailValidator.Result
}
