import bcrypt from 'bcrypt'

import { type Hasher } from '@/application/contracts'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}

  async hash (params: Hasher.Params): Promise<Hasher.Result> {
    return await bcrypt.hash(params.plaintext, this.salt)
  }
}
