import { bodyParser, cors } from '@/apis/middlewares'
import { type Express } from 'express'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(cors)
}
