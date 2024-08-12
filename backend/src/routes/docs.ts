import { Router, Request, Response, RequestHandler } from 'express'
import multer from 'multer'
import { uploadPDF } from '@services/google'
import { logger } from '@services/logger'
const docs = Router()
const upload = multer()

interface MulterRequest extends Request {
	files?: { [fieldName: string]: Express.Multer.File[]; } | Express.Multer.File[];
}

const handleUpload: RequestHandler = async (req: MulterRequest, res: Response) => {
	try {

		if (req.files && !Array.isArray(req.files) && req.files['pdf']) {
			const pdf = req.files['pdf'][0]
			uploadPDF('Testing', 'Contrato', pdf.buffer)
		}
		res.status(201).send('Documento creado')
	} catch (e: any) {
		logger.error(e.message)
		res.status(500).send('Error al crear el documento')
	}
}

// Usa la función handleUpload en el middleware
docs.post('/', upload.fields([{ name: 'pdf', maxCount: 1 }]), handleUpload)


docs.get('/', (req: Request, res: Response) => {
	res.send('Lista de documentos')
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