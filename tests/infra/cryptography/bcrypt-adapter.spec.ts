import bcrypt from 'bcrypt'

import { BcryptAdapter } from '@/infra/cryptography'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return 'any_hash'
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})
