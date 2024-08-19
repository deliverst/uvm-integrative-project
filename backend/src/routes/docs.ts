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
		const { companyName, documentType } = document
		console.log({ document })
		if (req.files && !Array.isArray(req.files) && req.files['pdf']) {
			const pdf = req.files['pdf'][0]
			uploadPDF(companyName, documentType, pdf.buffer)
		}

		// @ts-ignore
		document.url = await getSignedUrl(companyName, documentType)

		await document.save()
		res.status(201).send('Documento creado')
	} catch (e: any) {
		logger.error(e.message)
		res.status(500).send('Error al crear el documento')
	}
}

docs.post('/', upload.fields([{ name: 'pdf', maxCount: 1 }]), handleUpload)


docs.get('/', async (req: Request, res: Response) => {
	let documents
	documents = await documento.find({})
	console.log('data')
	res.send(documents)
})

docs.get('/:id', async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const document = await documento.findById(id)
		if (!document) {
			return res.status(404).send(`Documento con ID: ${id} no encontrado`)
		}
		res.json(document)
	} catch (error) {
		console.error('Error al obtener el documento:', error)
		res.status(500).send('Error al obtener el documento')
	}
})

docs.put('/:id', async (req: Request, res: Response) => {
	const { id } = req.params
	const updateData = req.body
	try {
		const updatedDocument = await documento.findByIdAndUpdate(id, updateData, {
			new: true,
			runValidators: true,
		})
		if (!updatedDocument) {
			return res.status(404).send(`Documento con ID: ${id} no encontrado`)
		}
		res.json(updatedDocument)
	} catch (error) {
		console.error('Error al actualizar el documento:', error)
		res.status(500).send('Error al actualizar el documento')
	}
})

docs.delete('/:id', async (req: Request, res: Response) => {
	const { id } = req.params
	try {
		const deletedDocument = await documento.findByIdAndDelete(id)
		if (!deletedDocument) {
			return res.status(404).send(`Documento con ID: ${id} no encontrado`)
		}
		res.send(`Documento con ID: ${id} eliminado`)
	} catch (error) {
		console.error('Error al eliminar el documento:', error)
		res.status(500).send('Error al eliminar el documento')
	}
})

export default docs
