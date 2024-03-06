import { faker } from "@faker-js/faker"

import { type AddAccountController } from "@/application/controllers"

export const mockAddAccountRequest = (): AddAccountController.Request => ({
  name: faker.internet.userName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
  passwordConfirmation: faker.internet.password()
})
