import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'

import { HashComparerAdapter } from '@/infra/cryptography'

import { throwError } from '@/tests/infra/errors'

const hash = faker.string.uuid()
const anyValue = faker.lorem.word()

jest.mock('bcrypt', () => ({
  async compare (): Promise<boolean> {
    return true
  }
}))

const makeSut = (): HashComparerAdapter => {
  return new HashComparerAdapter()
}

describe('HashComparerAdapter', () => {
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

  test('Should throw if compare throws', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
    const promise = sut.compare({ plaintext: anyValue, digest: hash })
    await expect(promise).rejects.toThrow()
  })
})
