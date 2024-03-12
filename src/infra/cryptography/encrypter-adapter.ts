import { type Encrypter } from '@/application/contracts/cryptography'

import jwt from 'jsonwebtoken'

export class EncrypterAdapter implements Encrypter {
  constructor (private readonly secret: string) { }

  async encrypt (plaintext: Encrypter.Params): Promise<Encrypter.Result> {
    return jwt.sign({ id: plaintext }, this.secret)
  }
}
