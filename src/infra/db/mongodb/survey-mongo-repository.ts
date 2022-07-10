import { AddSurveyRepository } from '@/data/protocols/db/survey'
import { MongoHelper } from '@/infra/db'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (data: AddSurveyRepository.Params): Promise<void> {
    const surveyCollection = MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
  }
}
