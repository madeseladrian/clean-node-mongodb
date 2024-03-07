import bcrypt from 'bcrypt'

export class BcryptAdapter {
  constructor (private readonly salt: number) {}

  async hash (plaintext: string): Promise<string> {
    return await bcrypt.hash(plaintext, this.salt)
  }
}
