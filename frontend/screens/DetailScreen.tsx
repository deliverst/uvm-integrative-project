import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
import Pdf from 'react-native-pdf'

const DetailScreen: React.FC = () => {
	const [documentUrl, setDocumentUrl] = useState<string | null>(null)
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		const fetchDocument = async () => {
			try {
				const response = await fetch('http://localhost:3000/docs')
				const data = await response.json()
				if (data.documents.url) {
					setDocumentUrl(data.documents.url)
				}
			} catch (error) {
				console.error('Error fetching documents:', error)
			} finally {
				setLoading(false)
			}
		}

		fetchDocument()
	}, [])

	if (loading) {
		return <ActivityIndicator size='large' color='#0000ff' />
	}

	if (!documentUrl) {
		return <Text>No PDF found</Text>
	}

	return (
		<View style={{ flex: 1 }}>
			<Text>PDF Document</Text>
			<Pdf
				source={{ uri: documentUrl, cache: true }}
				onLoadComplete={(numberOfPages, filePath) => {
					console.log(`Number of pages: ${numberOfPages}`)
				}}
				onPageChanged={(page, numberOfPages) => {
					console.log(`Current page: ${page}`)
				}}
				onError={(error) => {
					console.log(error)
				}}
				style={{ flex: 1 }}
			/>
		</View>
	)
}

export default DetailScreen
