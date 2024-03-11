export namespace Encrypter {
  export type Params = {
    plaintext: string
  }

  export type Result = string
}

export interface Encrypter {
  encrypt: (params: Encrypter.Params) => Promise<Encrypter.Result>
}
