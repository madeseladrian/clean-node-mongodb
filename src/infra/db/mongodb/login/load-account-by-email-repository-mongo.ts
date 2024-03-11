import { MongoHelper } from '@/infra/db/mongodb/helpers'

import { type LoadAccountByEmailRepository } from '@/application/contracts'

export class LoadAccountByEmailRepositoryMongo implements LoadAccountByEmailRepository {
  async loadByEmail (params: LoadAccountByEmailRepository.Params): Promise<LoadAccountByEmailRepository.Result> {
    const email = params.email
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return account && MongoHelper.map(account)
  }
}
