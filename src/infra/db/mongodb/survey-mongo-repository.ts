import { AddSurveyRepository, LoadSurveysRepository } from '@/data/protocols/db/survey'
import { MongoHelper, QueryBuilder } from '@/infra/db'
import { ObjectId } from 'mongodb'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (data: AddSurveyRepository.Params): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
  }

  async loadAll (accountId: string): Promise<LoadSurveysRepository.Result> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [{
            $size: {
              $filter: {
                input: '$result',
                as: 'item',
                cond: {
                  $eq: ['$$item.accountId', new ObjectId(accountId)]
                }
              }
            }
          }, 1]
        }
      })
      .build()
    const surveys = await surveyCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(surveys)
  }
}
