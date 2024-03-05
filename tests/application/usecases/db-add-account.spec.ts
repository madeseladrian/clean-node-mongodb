import { type AddAccount } from '@/domain/add-account'
import { faker } from '@faker-js/faker'

const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})

namespace CheckAccountByEmailRepository {
  export type Params = string
  export type Result = boolean
}

interface CheckAccountByEmailRepository {
  checkByEmail: (email: CheckAccountByEmailRepository.Params)
    => Promise<CheckAccountByEmailRepository.Result>
}

class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  email: CheckAccountByEmailRepository.Params
  result: CheckAccountByEmailRepository.Result = false

  async checkByEmail (email: CheckAccountByEmailRepository.Params): Promise<CheckAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}

const throwError = (): never => {
  throw new Error()
}

type SutTypes = {
  sut: DbAddAccount
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
}

class DbAddAccount implements AddAccount {
  constructor (
    private readonly checkAccountByEmailRepository: CheckAccountByEmailRepository
  ) { }

  async add (params: AddAccount.Params): Promise<AddAccount.Result> {
    await this.checkAccountByEmailRepository.checkByEmail(params.email)
    return false
  }
}

const makeSut = (): SutTypes => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const sut = new DbAddAccount(checkAccountByEmailRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy
  }
}

describe('DbAddAccount Usecase', () => {
  test('Should call CheckAccountByEmailRepository with correct email', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    const addAccountParams = mockAddAccountParams()
    await sut.add(addAccountParams)
    expect(checkAccountByEmailRepositorySpy.email).toBe(addAccountParams.email)
  })

  test('Should return false if CheckAccountByEmailRepository returns true', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    checkAccountByEmailRepositorySpy.result = true
    const isValid = await sut.add(mockAddAccountParams())
    expect(isValid).toBe(false)
  })

  test('Should throw if CheckAccountByEmailRepository throws', async () => {
    const { sut, checkAccountByEmailRepositorySpy } = makeSut()
    jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddAccountParams())
    await expect(promise).rejects.toThrow()
  })
})
