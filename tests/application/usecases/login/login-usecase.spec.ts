import { LoginUseCase } from '@/application/usecases/login'

import { throwError } from '@/tests/application/errors/errors'
import {
  LoadAccountByEmailRepositorySpy,
  mockLoginParams
} from '@/tests/application/usecases/login/mocks'

type SutTypes = {
  sut: LoginUseCase
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy

}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new LoginUseCase(loadAccountByEmailRepositorySpy)
  return {
    sut,
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
})
