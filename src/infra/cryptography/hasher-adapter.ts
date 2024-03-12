import bcrypt from 'bcrypt'

import { type Hasher } from '@/application/contracts'

export class HasherAdapter implements Hasher {
  constructor (private readonly salt: number) {}

  async hash (plaintext: Hasher.Params): Promise<Hasher.Result> {
    return await bcrypt.hash(plaintext, this.salt)
  }
}
