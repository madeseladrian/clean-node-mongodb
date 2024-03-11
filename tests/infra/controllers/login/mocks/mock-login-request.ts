import { faker } from '@faker-js/faker'

import { type LoginController } from '@/infra/controllers'

export const mockLoginRequest = (): LoginController.Request => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
