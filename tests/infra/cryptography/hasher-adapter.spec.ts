import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'

import { HasherAdapter } from '@/infra/cryptography'

import { throwError } from '@/tests/infra/errors'

const hash = faker.string.uuid()
const anyValue = faker.lorem.word()

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return hash
  }
}))

const salt = 12

const makeSut = (): HasherAdapter => {
  return new HasherAdapter(salt)
}

describe('HasherAdapter', () => {
  test('Should call hash with correct values', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash({ plaintext: anyValue })
    expect(hashSpy).toHaveBeenCalledWith(anyValue, salt)
  })

  test('Should return a valid hash on hash success', async () => {
    const sut = makeSut()
    const hashedValue = await sut.hash({ plaintext: anyValue })
    expect(hashedValue).toBe(hash)
  })

  test('Should throw if hash throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
    const promise = sut.hash({ plaintext: anyValue })
    await expect(promise).rejects.toThrow()
  })
})
