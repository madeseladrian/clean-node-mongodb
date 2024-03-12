import { noCache } from '@/apis/middlewares'
import swaggerConfig from '@/apis/swagger'

import { serve, setup } from 'swagger-ui-express'
import { type Express } from 'express'

export default (app: Express): void => {
  app.use('/api-docs', noCache, serve, setup(swaggerConfig))
}
