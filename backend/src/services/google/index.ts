import { Storage } from '@google-cloud/storage'
import 'dotenv/config'
import { logger} from '../logger'

const googleStorageConfig = {
	projectId: process.env.PROJECT_ID,
	credentials: {
		type: process.env.TYPE,
		project_id: process.env.PROJECT_ID,
		private_key_id: process.env.PRIVATE_KEY_ID,
		private_key: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n'),
		client_email: process.env.CLIENT_EMAIL,
		client_id: process.env.CLIENT_ID,
		auth_uri: process.env.AUTH_URI,
		token_uri: process.env.TOKEN_URI,
		auth_provider_x509_cert_url: process.env.AUTH_PROVIDER_X509_CERT_URL,
		client_x509_cert_url: process.env.CLIENT_X509_CERT_URL,
	},
}
const storage = new Storage(googleStorageConfig)
const bucketName = 'testin-buckts'
const bucket = storage.bucket(bucketName)

export const uploadPDF = (company: string, typeDocument: string, fileContent: Buffer): void => {

	console.log({ company, typeDocument, fileContent })
	const fileName = `${company}/${typeDocument}`
	const blob = bucket.file(fileName)
	console.log({ fileName })
	const blobStream = blob.createWriteStream({
		metadata: {
			contentType: 'application/pdf',
		},
	})

	blobStream.on('finish', () => {
		logger.info(`Archivo subido correctamente a: https://storage.googleapis.com/${bucketName}/${fileName}`)
	})

	blobStream.end(fileContent, 'binary')

	blobStream.on('error', (err) => {
		logger.error(`Error al subir el archivo: ${err}`)
	})
}


export const getSignedUrl = async (company: string, namePdf: string) => {

	const objectName = `${company}/${namePdf}`
	console.log({ objectName })
	const file = bucket.file(objectName)


	try {
		const [url] = await file.getSignedUrl({
			action: 'read',
			version: 'v4',
			expires: Date.now() + 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
		})

		console.log('Public access URL:', url)
		return url
	} catch (error) {
		console.error('Error generating public access URL:', error)
	}
}
