import {
  type CheckAccountByEmailRepository,
  type SignUpRepository
} from '@/application/contracts'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

export class SignUpMongoRepository implements SignUpRepository, CheckAccountByEmailRepository {
  async add (account: SignUpRepository.Params): Promise<SignUpRepository.Result> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(account)
    return result.insertedId !== null
  }

  async checkByEmail (email: string): Promise<CheckAccountByEmailRepository.Result> {
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
