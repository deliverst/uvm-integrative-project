import React, { useState, useEffect } from 'react';
import { View, Text, Button, ActivityIndicator, FlatList } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../App';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
};

type Document = {
  _id: string;
  documentName: string;
  documentType: string;
  companyName: string;
  url: string;
};

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [document, setDocument] = useState<Document | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDocument = async () => {
      try {
        const response = await fetch('http://localhost:3000/docs');
        const data = await response.json();
        setDocument(data.documents); // Accedemos a la propiedad `documents`
      } catch (error) {
        console.error('Error fetching documents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDocument();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (!document) {
    return <Text>No documents found</Text>;
  }

  return (
    <View>
      <Text>Home Screen</Text>
      <View>
        <Text>{document.documentName}</Text>
        <Text>{document.documentType}</Text>
        <Text>{document.companyName}</Text>
      </View>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
};

export default HomeScreen;
