import { Router, Request, Response } from 'express'

const isAlive = Router()

isAlive.get('/', ((req: Request, res: Response) => {
		res.status(200).json({ message: 'is alive 🐈' })
	}
))

export default isAlive
