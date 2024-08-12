import { Document } from 'mongoose'

export interface IDocumento extends Document {
	documentName: string;
	documentType: string;
	companyName: string;
	url: string;
	createdAt?: Date;
	updatedAt?: Date;
}