import { DbLoadAccountByToken } from '@/data/usecases'
import { throwError } from '@/tests/domain/mocks'
import { DecrypterSpy, LoadAccountByTokenRepositorySpy } from '@/tests/data/mocks'
import faker from 'faker'

type SutTypes = {
  decrypterSpy: DecrypterSpy
  loadAccountByTokenRepositorySpy: LoadAccountByTokenRepositorySpy
  sut: DbLoadAccountByToken
}

const makeSut = (): SutTypes => {
  const decrypterSpy = new DecrypterSpy()
  const loadAccountByTokenRepositorySpy = new LoadAccountByTokenRepositorySpy()
  const sut = new DbLoadAccountByToken(decrypterSpy, loadAccountByTokenRepositorySpy)
  return {
    decrypterSpy,
    loadAccountByTokenRepositorySpy,
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
    const { decrypterSpy, sut } = makeSut()
    decrypterSpy.plaintext = null
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  test('3 - Should call LoadAccountByTokenRepository with correct values', async () => {
    const { loadAccountByTokenRepositorySpy, sut } = makeSut()
    await sut.load(token, role)
    expect(loadAccountByTokenRepositorySpy.token).toBe(token)
    expect(loadAccountByTokenRepositorySpy.role).toBe(role)
  })

  test('4 - Should return null if LoadAccountByTokenRepository returns null', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    loadAccountByTokenRepositorySpy.result = null
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  test('5 - Should return an account on success', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    const account = await sut.load(token, role)
    expect(account).toEqual(loadAccountByTokenRepositorySpy.result)
  })

  test('6 - Should throw if Decrypter throws', async () => {
    const { sut, decrypterSpy } = makeSut()
    jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
    const account = await sut.load(token, role)
    expect(account).toBeNull()
  })

  test('7 - Should throw if LoadAccountByTokenRepository throws', async () => {
    const { sut, loadAccountByTokenRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByTokenRepositorySpy, 'loadByToken').mockImplementationOnce(throwError)
    const promise = sut.load(token, role)
    await expect(promise).rejects.toThrow()
  })
})
