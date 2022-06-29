import { AccountModel } from '../../../domain/models'
import { AddAccountModel } from '../../../domain/usecases'
import { Encrypter } from '../../protocols/cryptography'
import { AddAccountRepository } from '../../protocols/db'
import { DbAddAccount } from '.'

const makeEncrypter = (): Encrypter => {
  class EncrypterStub {
    async encrypt (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email',
  password: 'hashed_password'
})

const makeFakeAccountData = (): AddAccountModel => ({
  name: 'valid_name',
  email: 'valid_email',
  password: 'valid_password'
})

const makeAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountModel): Promise<AccountModel> {
      return new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new AddAccountRepositoryStub()
}

interface SutTypes {
  addAccountRepositoryStub: AddAccountRepository
  encryptStub: Encrypter
  sut: DbAddAccount
}

const makeSut = (): SutTypes => {
  const addAccountRepositoryStub = makeAddAccountRepository()
  const encryptStub = makeEncrypter()
  const sut = new DbAddAccount(addAccountRepositoryStub, encryptStub)
  return { addAccountRepositoryStub, encryptStub, sut }
}

describe('DbAddAccount Usecase', () => {
  test('1 - Should call Encrypter with correct password', async () => {
    const { encryptStub, sut } = makeSut()
    const encryptSpy = jest.spyOn(encryptStub, 'encrypt')
    await sut.add(makeFakeAccountData())
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })

  test('2 - Should throw Encrypter throws', async () => {
    const { encryptStub, sut } = makeSut()
    jest.spyOn(encryptStub, 'encrypt').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('3 - Should call AddAccountRepository with correct values', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    await sut.add(makeFakeAccountData())
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email',
      password: 'hashed_password'
    })
  })

  test('4 - Should throw if AddAccountRepository throws', async () => {
    const { addAccountRepositoryStub, sut } = makeSut()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.add(makeFakeAccountData())
    await expect(promise).rejects.toThrow()
  })

  test('5 - Should return an account on success', async () => {
    const { sut } = makeSut()
    const account = await sut.add(makeFakeAccountData())
    expect(account).toEqual(makeFakeAccount())
  })
})
