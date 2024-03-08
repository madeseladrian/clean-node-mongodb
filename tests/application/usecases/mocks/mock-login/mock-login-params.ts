import { faker } from '@faker-js/faker'

import { type Login } from '@/domain/entities/login'

export const mockLoginParams = (): Login.Params => ({
  email: faker.internet.email(),
  password: faker.internet.password()
})
