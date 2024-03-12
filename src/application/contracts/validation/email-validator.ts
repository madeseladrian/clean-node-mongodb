export namespace EmailValidator {
  export type Params = string
  export type Result = boolean
}

export interface EmailValidator {
  isValid: (email: EmailValidator.Params) => EmailValidator.Result
}
