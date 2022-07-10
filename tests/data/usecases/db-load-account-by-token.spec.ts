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

let role: string
let token: string

describe('DbLoadAccountByToken Usecase', () => {
  beforeEach(() => {
    role = faker.random.word()
    token = faker.datatype.uuid()
  })

  test('1 - Should call Decrypter with correct ciphertext', async () => {
    const { decrypterSpy, sut } = makeSut()
    await sut.load(token)
    expect(decrypterSpy.ciphertext).toBe(token)
  })

  test('2 - Should return null if Decrypter returns null', async () => {
    const { sut, decrypterSpy } = makeSut()
    decrypterSpy.plaintext = null
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })
})
