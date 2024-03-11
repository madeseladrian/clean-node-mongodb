import { ObjectId } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/helpers'

import { type UpdateAccessTokenRepository } from '@/application/contracts/db'

export class UpdateAccessTokenRepositoryMongo implements UpdateAccessTokenRepository {
  async updateAccessToken (params: UpdateAccessTokenRepository.Params): Promise<void> {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(params.id) // Convert id to ObjectId type
    }, {
      $set: {
        accessToken: params.token
      }
    })
  }
}
