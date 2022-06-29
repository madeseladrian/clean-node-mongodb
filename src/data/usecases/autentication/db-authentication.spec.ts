import { AccountModel } from '../../../domain/models'
import { LoadAccountByEmailRepository } from '../protocols'
import { DbAuthentication } from '.'

const makeFakeAccount = (): AccountModel => ({
  id: 'any_id',
  name: 'any_name',
  email: 'any_email@example.com',
  password: 'any_password'
})

describe('DbAuthentication UseCase', () => {
  test('1 - Should call LoadAccountByEmailRepository with correct email', async () => {
    class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
      async load (email: string): Promise<AccountModel> {
        return new Promise(resolve => resolve(makeFakeAccount()))
      }
    }
    const loadAccountByEmailRepository = new LoadAccountByEmailRepositoryStub()
    const sut = new DbAuthentication(loadAccountByEmailRepository)
    const loadSpy = jest.spyOn(loadAccountByEmailRepository, 'load')
    await sut.auth({
      email: 'any_email@example.com',
      password: 'any_password'
    })
    expect(loadSpy).toHaveBeenCalledWith('any_email@example.com')
  })
})
