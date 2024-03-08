import { type SignUpRepository } from '@/application/contracts'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

export class SignUpRepositoryMongo implements SignUpRepository {
  async add (account: SignUpRepository.Params): Promise<SignUpRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    return result.insertedId !== null
  }
}
