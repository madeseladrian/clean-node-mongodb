import 'module-alias/register'

import env from '@/apis/config/env'
import { MongoHelper } from '@/infra/db/mongodb/helpers'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { setupApp } = await import('./config/app')
    const app = await setupApp()
    app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
