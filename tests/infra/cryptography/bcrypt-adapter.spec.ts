import bcrypt from 'bcrypt'

import { BcryptAdapter } from '@/infra/cryptography'
import { faker } from '@faker-js/faker'

const hash = faker.string.uuid()

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return hash
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

  test('Should return a valid hash on hash success', async () => {
      const sut = makeSut()
      const hashedValue = await sut.hash('any_value')
      expect(hashedValue).toBe(hash)
    })
})
