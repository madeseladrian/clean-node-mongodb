import { addAccountValidationFactory } from '@/apis/factories/validation'
import { dbAddAccountFactory } from '@/apis/factories/usecases'

import { type Controller } from '@/application/contracts/controller'
import { AddAccountController } from '@/infra/controllers'

export const addAccountControllerFactory = (): Controller => {
  return new AddAccountController(
    dbAddAccountFactory(),
    addAccountValidationFactory()
  )
}
