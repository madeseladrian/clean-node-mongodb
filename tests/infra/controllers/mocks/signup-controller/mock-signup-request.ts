import { faker } from '@faker-js/faker'

import { type SignUpController } from '@/infra/controllers'

export const mockSignUpRequest = (): SignUpController.Params => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordConfirmation: faker.internet.password()
})
