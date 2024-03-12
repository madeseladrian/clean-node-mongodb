import { faker } from '@faker-js/faker'

import { type LoadAccountByEmailRepository } from '@/application/contracts/db/login'

export class LoadAccountByEmailRepositorySpy implements LoadAccountByEmailRepository {
  email: string
  result = {
    id: faker.string.uuid(),
    name: faker.internet.userName(),
    password: faker.internet.password()
  }

  async loadByEmail (email: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
    this.email = email
    return this.result
  }
}
