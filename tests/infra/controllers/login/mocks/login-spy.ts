import { type Login } from '@/domain/entities/login'
import { faker } from '@faker-js/faker'

export class LoginSpy implements Login {
  params: Login.Params
  result = {
    accessToken: faker.string.uuid(),
    name: faker.internet.userName()
  }

  async auth (params: Login.Params): Promise<Login.Result> {
    this.params = params
    return this.result
  }
}
