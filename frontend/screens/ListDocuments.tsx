import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

type Document = {
  _id: string;
  documentName: string;
  documentType: string;
  companyName: string;
  createdAt: string;
  updatedAt: string;
  url: string; // Asegúrate de que los documentos tengan una propiedad `url`
};

const ListDocuments: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await fetch('http://localhost:3000/docs');
        const data = await response.json();
        setDocuments(data);
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, []);

  const handlePress = (documentUrl: string) => {
    navigation.navigate('PdfScreen', { documentUrl });
  };

  const renderItem = ({ item }: { item: Document }) => (
    <TouchableOpacity onPress={() => handlePress(item.url)}>
      <View style={styles.row}>
        <Text style={styles.cell}>{item.documentName}</Text>
        <Text style={styles.cell}>{item.documentType}</Text>
        <Text style={styles.cell}>{item.companyName}</Text>
        <Text style={styles.cell}>{new Date(item.createdAt).toLocaleString()}</Text>
        <Text style={styles.cell}>{new Date(item.updatedAt).toLocaleString()}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Documents</Text>
      <View style={styles.table}>
        <View style={styles.rowHeader}>
          <Text style={styles.cellHeader}>Document Name</Text>
          <Text style={styles.cellHeader}>Document Type</Text>
          <Text style={styles.cellHeader}>Company Name</Text>
          <Text style={styles.cellHeader}>Created At</Text>
          <Text style={styles.cellHeader}>Updated At</Text>
        </View>
        <FlatList
          data={documents}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<Text>No documents found.</Text>}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
  },
  rowHeader: {
    flexDirection: 'row',
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  cellHeader: {
    flex: 1,
    padding: 8,
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    padding: 8,
  },
});

export default ListDocuments;
