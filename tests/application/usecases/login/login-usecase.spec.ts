import { LoginUseCase } from '@/application/usecases/login'

import { throwError } from '@/tests/application/errors/errors'
import {
  EncrypterSpy,
  HashComparerSpy,
  LoadAccountByEmailRepositorySpy,
  UpdateAccessTokenRepositorySpy,
  mockLoginParams
} from '@/tests/application/usecases/login/mocks'

type SutTypes = {
  sut: LoginUseCase
  encrypterSpy: EncrypterSpy
  hashComparerSpy: HashComparerSpy
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): SutTypes => {
  const encrypterSpy = new EncrypterSpy()
  const hashComparerSpy = new HashComparerSpy()
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new LoginUseCase(
    encrypterSpy,
    hashComparerSpy,
    loadAccountByEmailRepositorySpy,
    updateAccessTokenRepositorySpy
  )
  return {
    sut,
    encrypterSpy,
    hashComparerSpy,
    loadAccountByEmailRepositorySpy,
    updateAccessTokenRepositorySpy
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

  test('Should call Encrypter with correct plaintext', async () => {
    const { sut, encrypterSpy, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    hashComparerSpy.isValid = true
    await sut.auth(mockLoginParams())
    expect(encrypterSpy.plaintext).toBe(loadAccountByEmailRepositorySpy.result.id)
  })

  test('Should not call Encrypter if HashComparer returns false ', async () => {
    const { sut, encrypterSpy } = makeSut()
    const model = await sut.auth(mockLoginParams())
    expect(encrypterSpy.plaintext).toBe(undefined)
    expect(model).toBeNull()
  })

  test('Should call UpdateAccessTokenRepository with correct values', async () => {
    const {
      sut,
      encrypterSpy,
      hashComparerSpy,
      loadAccountByEmailRepositorySpy,
      updateAccessTokenRepositorySpy
    } = makeSut()
    hashComparerSpy.isValid = true
    await sut.auth(mockLoginParams())
    expect(updateAccessTokenRepositorySpy.id).toBe(loadAccountByEmailRepositorySpy.result.id)
    expect(updateAccessTokenRepositorySpy.token).toBe(encrypterSpy.ciphertext)
  })

  test('Should throw if UpdateAccessTokenRepository throws', async () => {
    const { sut, hashComparerSpy, updateAccessTokenRepositorySpy } = makeSut()
     hashComparerSpy.isValid = true
    jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockImplementationOnce(throwError)
    const promise = sut.auth(mockLoginParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return data on success', async () => {
    const { sut, encrypterSpy, hashComparerSpy, loadAccountByEmailRepositorySpy } = makeSut()
    hashComparerSpy.isValid = true
    const { accessToken, name } = await sut.auth(mockLoginParams())
    expect(accessToken).toBe(encrypterSpy.ciphertext)
    expect(name).toBe(loadAccountByEmailRepositorySpy.result.name)
  })
})
