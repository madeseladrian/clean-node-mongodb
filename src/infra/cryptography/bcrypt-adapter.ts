import bcrypt from 'bcrypt'

import { type Hasher } from '@/application/contracts'

export class BcryptAdapter implements Hasher {
  constructor (private readonly salt: number) {}

  async hash (plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, this.salt)
  }
}
