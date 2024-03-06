export namespace Hasher {
  export type Params = string
  export type Result = string
}

export interface Hasher {
  hash: (plaintext: Hasher.Params) => Promise<Hasher.Result>
}
