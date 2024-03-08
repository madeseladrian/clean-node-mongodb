import { DbLogin } from '@/application/usecases/login'

import {
  LoadAccountByEmailRepositorySpy,
  mockLoginParams
} from '@/tests/application/usecases/mocks/mock-login'

type SutTypes = {
  sut: DbLogin
  loadAccountByEmailRepositorySpy: LoadAccountByEmailRepositorySpy

}

const makeSut = (): SutTypes => {
  const loadAccountByEmailRepositorySpy = new LoadAccountByEmailRepositorySpy()
  const sut = new DbLogin(loadAccountByEmailRepositorySpy)
  return {
    sut,
    loadAccountByEmailRepositorySpy
  }
}

describe('DbLogin UseCase', () => {
  test('Should call LoadAccountByEmailRepository with correct email', async () => {
    const { sut, loadAccountByEmailRepositorySpy } = makeSut()
    const authenticationParams = mockLoginParams()
    await sut.auth(authenticationParams)
    expect(loadAccountByEmailRepositorySpy.email).toBe(authenticationParams.email)
  })
})
