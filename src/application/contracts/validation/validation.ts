export namespace Validation {
  export type Params = any
  export type Result = Error
}

export interface Validation {
  validate: (params: Validation.Params) => Validation.Result
}
