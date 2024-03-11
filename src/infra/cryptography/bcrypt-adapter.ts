import bcrypt from 'bcrypt'

import { type HashComparer, type Hasher } from '@/application/contracts'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor (private readonly salt: number) {}

  async hash (params: Hasher.Params): Promise<Hasher.Result> {
    return await bcrypt.hash(params.plaintext, this.salt)
  }

  async compare (params: HashComparer.Params): Promise<HashComparer.Result> {
    return await bcrypt.compare(params.plaintext, params.digest)
  }
}
