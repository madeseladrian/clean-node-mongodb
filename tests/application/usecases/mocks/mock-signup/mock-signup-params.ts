import { faker } from '@faker-js/faker'

import { type SignUp } from '@/domain/entities/signup'

export const mockSignUpParams = (): SignUp.Params => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password()
})
