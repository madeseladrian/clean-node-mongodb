import { LoginUsecase } from '@/application/usecases/login'

import {
  LoadAccountByEmailRepositorySpy,
  mockLoginParams
} from '@/tests/application/usecases/login/mocks'

type SutTypes = {
  sut: LoginUsecase
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy

}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new LoginUsecase(loadAccountByEmailRepositorySpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy
  }
}

describe('LoginUsecase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockLoginParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })
})
