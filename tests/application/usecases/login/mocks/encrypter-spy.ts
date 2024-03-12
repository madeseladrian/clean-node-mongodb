import { faker } from '@faker-js/faker'

import { type Encrypter } from '@/application/contracts/cryptography'

export class EncrypterSpy implements Encrypter {
  ciphertext = faker.string.uuid()
  plaintext: string

  async encrypt (plaintext: Encrypter.Params): Promise<Encrypter.Result> {
    this.plaintext = plaintext
    return this.ciphertext
  }
}
