import { type Hasher } from '@/application/contracts/cryptography'

export class HasherSpy implements Hasher {
  plaintext: string
  digest: Hasher.Result

  async hash (params: Hasher.Params): Promise<Hasher.Result> {
    this.plaintext = params.plaintext
    return this.digest
  }
}
