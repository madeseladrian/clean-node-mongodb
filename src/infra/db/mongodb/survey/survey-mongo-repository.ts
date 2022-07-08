import { AddSurveyRepository } from '../../../../data/protocols/db/survey'
import { AddSurveyModel } from '../../../../domain/models'
import { MongoHelper } from '../helpers'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(surveyData)
  }
}
