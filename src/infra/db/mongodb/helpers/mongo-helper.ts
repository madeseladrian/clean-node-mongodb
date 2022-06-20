import { MongoClient } from 'mongodb'

export const MongoHelper = {
  client: null as MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = MongoClient.connect(uri)
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}
