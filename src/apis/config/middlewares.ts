import { bodyParser } from '@/apis/middlewares'
import { type Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParser)
}
