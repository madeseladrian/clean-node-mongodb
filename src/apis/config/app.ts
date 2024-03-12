import express, { type Express } from 'express'

import setupMiddlewares from '@/apis/config/middlewares'
import setupRoutes from '@/apis/config/routes'
import setupSwagger from '@/apis/config/swagger'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupSwagger(app)
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
