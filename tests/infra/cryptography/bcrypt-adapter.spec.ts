import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'

import { BcryptAdapter } from '@/infra/cryptography'

import { throwError } from '@/tests/infra/errors'

const hash = faker.string.uuid()
const anyValue = faker.lorem.word()

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return hash
  },

  async compare (): Promise<boolean> {
    return true
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  describe('hash()', () => {
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

  describe('compare()', () => {
    test('Should call compare with correct values', async () => {
      const sut = makeSut()
      const compareSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare({ plaintext: anyValue, digest: hash })
      expect(compareSpy).toHaveBeenCalledWith(anyValue, hash)
    })

    test('Should return true when compare succeeds', async () => {
      const sut = makeSut()
      const isValid = await sut.compare({ plaintext: anyValue, digest: hash })
      expect(isValid).toBe(true)
    })

    test('Should return false when compare fails', async () => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
      const isValid = await sut.compare({ plaintext: anyValue, digest: hash })
      expect(isValid).toBe(false)
    })
  })
})
