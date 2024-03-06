import { faker } from '@faker-js/faker'

import { type AddAccount } from '@/domain/add-account'

export const mockAddAccountParams = (): AddAccount.Params => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})
