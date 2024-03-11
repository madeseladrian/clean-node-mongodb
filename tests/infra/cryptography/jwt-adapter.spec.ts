import jwt from 'jsonwebtoken'

import { JwtAdapter } from '@/infra/cryptography'
import { faker } from '@faker-js/faker'

const anyId = faker.string.uuid()

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return 'any_token'
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JwtAdapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt({ plaintext: anyId })
    expect(signSpy).toHaveBeenCalledWith({ id: anyId }, 'secret')
  })
})
