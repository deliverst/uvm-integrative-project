import express from 'express'
import 'module-alias/register';
import '@services/db';
import bodyParser from 'body-parser'
import { routerApi } from './routes'
import 'dotenv/config'
import { logger } from '@services/logger'
const app = express()
const port = 3000

app.use(bodyParser.json())

routerApi(app)

app.listen(port, () => {
	logger.info(`\n\t\tServer is running on http://localhost:${port}`)
})
