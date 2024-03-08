import express, { type Express } from 'express'

import setupMiddlewares from '@/apis/config/middlewares'
import setupRoutes from '@/apis/config/routes'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
