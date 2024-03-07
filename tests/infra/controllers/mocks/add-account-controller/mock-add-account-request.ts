import { faker } from '@faker-js/faker'

import { type AddAccountController } from '@/infra/controllers'

export const mockAddAccountRequest = (): AddAccountController.Params => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordConfirmation: faker.internet.password()
})
