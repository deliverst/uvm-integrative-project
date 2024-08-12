import mongoose from 'mongoose'

export const connectDB = async (): Promise<void> => {
	try {
		const conn = await mongoose.connect('mongodb://localhost:27017/uvm-integrative')
		console.log(`MongoDB Connected: ${conn.connection.db.databaseName}`)
	} catch (e: any) {
		console.error(`Error: ${e.message}`)
		process.exit(1)
	}
}

connectDB()