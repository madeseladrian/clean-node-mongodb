import { faker } from '@faker-js/faker'
import jwt from 'jsonwebtoken'

import { EncrypterAdapter } from '@/infra/cryptography'

import { throwError } from '@/tests/application/errors'

const anyId = faker.string.uuid()
const token = faker.string.uuid()

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return token
  }
}))

const makeSut = (): EncrypterAdapter => {
  return new EncrypterAdapter('secret')
}

describe('EncrypterAdapter', () => {
  test('Should call sign with correct values', async () => {
    const sut = makeSut()
    const signSpy = jest.spyOn(jwt, 'sign')
    await sut.encrypt(anyId)
    expect(signSpy).toHaveBeenCalledWith({ id: anyId }, 'secret')
  })

  test('Should return a token on sign success', async () => {
    const sut = makeSut()
    const accessToken = await sut.encrypt(anyId)
    expect(accessToken).toBe(token)
  })

  test('Should throw if sign throws', async () => {
    const sut = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
    const promise = sut.encrypt(anyId)
    await expect(promise).rejects.toThrow()
  })
})
