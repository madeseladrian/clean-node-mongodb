import { type HashComparer } from '@/application/contracts/cryptography'

export class HashComparerSpy implements HashComparer {
  plaintext: string
  digest: string
  isValid = true

  async compare (params: HashComparer.Params): Promise<HashComparer.Result> {
    this.plaintext = params.plaintext
    this.digest = params.digest
    return this.isValid
  }
}
