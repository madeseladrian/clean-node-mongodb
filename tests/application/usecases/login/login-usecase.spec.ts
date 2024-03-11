import { LoginUseCase } from '@/application/usecases/login'

import { throwError } from '@/tests/application/errors/errors'
import {
  HashComparerSpy,
  LoadAccountByEmailRepositorySpy,
  mockLoginParams
} from '@/tests/application/usecases/login/mocks'

type SutTypes = {
  sut: LoginUseCase
  hashComparerSpy: HashComparerSpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
}

const makeSut = (): SutTypes => {
  const hashComparerSpy = new HashComparerSpy()
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new LoginUseCase(
    hashComparerSpy,
    loadAccountByEmailRepositorySpy
  )
  return {
    sut,
    hashComparerSpy,
    loadAccountByEmailRepositorySpy
  }
}

describe('LoginUseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockLoginParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })

  test('Should throw if LoadAccountByEmailRepository throws', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(loadAccountByEmailRepositorySpy, 'loadByEmail').mockImplementationOnce(throwError)
    const promise = sut.auth(mockLoginParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if LoadAccountByEmailRepository returns null', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    loadAccountByEmailRepositorySpy.result = null
    const model = await sut.auth(mockLoginParams())
    expect(model).toBeNull()
  })

  test('Should call HashComparer with correct values', async () => {
    const { sut, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    const loginParams = mockLoginParams()
    await sut.auth(loginParams)
    expect(hashComparerSpy.plaintext).toBe(loginParams.password)
    expect(hashComparerSpy.digest).toBe(loadAccountByEmailRepositorySpy.result.password)
  })

  test('Should throw if HashComparer throws', async () => {
    const { sut, hashComparerSpy } = makeSut()
    jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
    const promise = sut.auth(mockLoginParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return null if HashComparer returns false', async () => {
    const { sut } = makeSut()
    const model = await sut.auth(mockLoginParams())
    expect(model).toBeNull()
  })
})
