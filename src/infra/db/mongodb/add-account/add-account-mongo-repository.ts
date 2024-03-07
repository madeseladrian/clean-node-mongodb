import { type AddAccountRepository } from '@/application/contracts'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

export class AddAccountMongoRepository implements AddAccountRepository {
  async add (account: AddAccountRepository.Params): Promise<AddAccountRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    return result.insertedId !== null
  }
}
