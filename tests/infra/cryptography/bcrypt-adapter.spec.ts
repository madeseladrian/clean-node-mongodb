import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'

import { BcryptAdapter } from '@/infra/cryptography'

import { throwError } from '@/tests/infra/errors'

const plaintext = faker.lorem.word()
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
    await sut.hash({ plaintext })
    expect(hashSpy).toHaveBeenCalledWith(plaintext, salt)
  })

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hashedValue = await sut.hash({ plaintext })
    expect(hashedValue).toBe(hash)
  })

  test('Should throw if hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
    const promise = sut.hash({ plaintext })
    await expect(promise).rejects.toThrow()
  })
})
