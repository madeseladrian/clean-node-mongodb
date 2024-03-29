import { MongoHelper } from '@/infra/db/mongodb/helpers'

import { type CheckAccountByEmailRepository } from '@/application/contracts'

export class CheckAccountByEmailRepositoryMongo implements CheckAccountByEmailRepository {
  async checkByEmail (email: CheckAccountByEmailRepository.Params): Promise<CheckAccountByEmailRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return account !== null
  }
}
