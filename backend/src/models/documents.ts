import mongoose, { Schema } from 'mongoose'
import { IDocumento } from '../types/documents'

const DocumentoSchema: Schema = new Schema({
		documentName: { type: String, required: true },
		documentType: { type: String, required: true },
		companyName: { type: String, required: true },
		url: { type: String, required: true },
	},
	{ timestamps: true },
)

const Documento = mongoose.model<IDocumento>('documents', DocumentoSchema)

export default Documento
