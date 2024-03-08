import { type Hasher } from '@/application/contracts/cryptography'

export class HasherSpy implements Hasher {
  plaintext: Hasher.Params
  digest: Hasher.Result

  async hash (plaintext: Hasher.Params): Promise<Hasher.Result> {
    this.plaintext = plaintext
    return this.digest
  }
}
