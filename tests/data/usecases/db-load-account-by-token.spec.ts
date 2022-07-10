import { DbLoadAccountByToken } from '@/data/usecases'
import { DecrypterSpy } from '@/tests/data/mocks'
import faker from 'faker'

type SutTypes = {
  decrypterSpy: DecrypterSpy
  sut: DbLoadAccountByToken
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const sut = new DbLoadAccountByToken(decrypterSpy)
  return {
    decrypterSpy,
    sut
  }
}

let token: string

describe('DbLoadAccountByToken Usecase', () => {
  beforeEach(() => {
    token = faker.datatype.uuid()
  })

  test('1 - Should call Decrypter with correct ciphertext', async () => {
    const { decrypterSpy, sut } = makeSut()
    await sut.load(token)
    expect(decrypterSpy.ciphertext).toBe(token)
  })
})
