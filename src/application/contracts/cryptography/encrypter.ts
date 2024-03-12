export namespace Encrypter {
  export type Params = string
  export type Result = string
}

export interface Encrypter {
  encrypt: (plaintext: Encrypter.Params) => Promise<Encrypter.Result>
}
