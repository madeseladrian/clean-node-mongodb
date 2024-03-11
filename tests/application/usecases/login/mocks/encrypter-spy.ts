import { faker } from '@faker-js/faker'

import { type Encrypter } from '@/application/contracts/cryptography'

export class EncrypterSpy implements Encrypter {
  ciphertext = faker.string.uuid()
  plaintext: string

  async encrypt (params: Encrypter.Params): Promise<Encrypter.Result> {
    this.plaintext = params.plaintext
    return this.ciphertext
  }
}
