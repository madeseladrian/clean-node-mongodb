import { SignUpUseCase } from '@/application/usecases/signup'

import { throwError } from '@/tests/application/errors'
import {
  SignUpRepositorySpy,
  CheckAccountByEmailRepositorySpy,
  HasherSpy,
  mockSignUpParams
} from '@/tests/application/usecases/signup/mocks'

type SutTypes = {
  sut: SignUpUseCase
  signUpRepositorySpy: SignUpRepositorySpy
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  hasherSpy: HasherSpy
}

const makeSut = (): SutTypes => {
  const signUpRepositorySpy = new SignUpRepositorySpy()
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const sut = new SignUpUseCase(
    checkAccountByEmailRepositorySpy,
    hasherSpy,
    signUpRepositorySpy
  )
  return {
    sut,
    signUpRepositorySpy,
    checkAccountByEmailRepositorySpy,
    hasherSpy
  }
}

describe('SignUpUseCase', () => {
  test('Should call CheckAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const signUpParams = mockSignUpParams()
    await sut.add(signUpParams)
    expect(checkAccountByEmailRepositorySpy.email).toBe(signUpParams.email)
  })

  test('Should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const isValid = await sut.add(mockSignUpParams())
    expect(isValid).toBe(false)
  })

  test('Should throw if CheckAccountByEmailRepository throws', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)
    const promise = sut.add(mockSignUpParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call Hasher with correct plaintext', async () => {
    const { sut, hasherSpy } = makeSut()
    const signUpParams = mockSignUpParams()
    await sut.add(signUpParams)
    expect(hasherSpy.plaintext).toBe(signUpParams.password)
  })

  test('Should not call Hasher if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy, hasherSpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const signUpParams = mockSignUpParams()
    await sut.add(signUpParams)
    expect(hasherSpy.plaintext).toBe(undefined)
  })

  test('Should throw if Hasher throws', async () => {
    const { sut, hasherSpy } = makeSut()
    jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
    const promise = sut.add(mockSignUpParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should call SignUpRepository with correct values', async () => {
    const { sut, signUpRepositorySpy, hasherSpy } = makeSut()
    const signUpParams = mockSignUpParams()
    await sut.add(signUpParams)
    expect(signUpRepositorySpy.params).toEqual({
      name: signUpParams.name,
      email: signUpParams.email,
      password: hasherSpy.digest
    })
  })

  test('Should throw if SignUpRepository throws', async () => {
    const { sut, signUpRepositorySpy } = makeSut()
    jest.spyOn(signUpRepositorySpy, 'add').mockImplementationOnce(throwError)
    const promise = sut.add(mockSignUpParams())
    await expect(promise).rejects.toThrow()
  })

  test('Should return true if SignUpRepository returns true', async () => {
    const { sut, signUpRepositorySpy } = makeSut()
    signUpRepositorySpy.result = true
    const isValid = await sut.add(mockSignUpParams())
    expect(isValid).toBe(true)
  })

  test('Should return false if SignUpRepository returns false', async () => {
    const { sut } = makeSut()
    const isValid = await sut.add(mockSignUpParams())
    expect(isValid).toBe(false)
  })
})
