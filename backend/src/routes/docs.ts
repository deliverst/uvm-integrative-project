import { Router, Request, Response, RequestHandler } from 'express'
import multer from 'multer'
import { getSignedUrl, uploadPDF } from '@services/google'
import { logger } from '@services/logger'
import documento from '../models/documents'

const docs = Router()
const upload = multer()

interface MulterRequest extends Request {
	files?: { [fieldName: string]: Express.Multer.File[]; } | Express.Multer.File[];
}

const handleUpload: RequestHandler = async (req: MulterRequest, res: Response) => {

	const data = req.body

	try {

		const document = await new documento(data)
		await document.save()
		const { companyName, documentType } = document
		console.log({ document })
		if (req.files && !Array.isArray(req.files) && req.files['pdf']) {
			const pdf = req.files['pdf'][0]
			uploadPDF(companyName, documentType, pdf.buffer)
		}
		res.status(201).send('Documento creado')
	} catch (e: any) {
		logger.error(e.message)
		res.status(500).send('Error al crear el documento')
	}
}

// Usa la función handleUpload en el middleware
docs.post('/', upload.fields([{ name: 'pdf', maxCount: 1 }]), handleUpload)


docs.get('/', async (req: Request, res: Response) => {
	let documents
	[documents] = await documento.find({})
	const { companyName, documentType } = documents
	const url = await getSignedUrl(companyName, documentType)
	// @ts-ignore
	documents.url = url
	console.log({ documents })
	res.send({ documents })
})

docs.get('/:id', (req: Request, res: Response) => {
	const { id } = req.params
	res.send(`Documento con ID: ${id}`)
})

docs.put('/:id', (req: Request, res: Response) => {
	const { id } = req.params
	res.send(`Documento con ID: ${id} actualizado`)
})

docs.delete('/:id', (req: Request, res: Response) => {
	const { id } = req.params
	res.send(`Documento con ID: ${id} eliminado`)
})

export default docs
