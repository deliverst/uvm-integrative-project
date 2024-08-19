import React from 'react';
import { View, Text } from 'react-native';
import Pdf from 'react-native-pdf';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../App';

type PdfScreenRouteProp = RouteProp<RootStackParamList, 'PdfScreen'>;

type Props = {
  route: PdfScreenRouteProp;
};

const PdfScreen: React.FC<Props> = ({ route }) => {
  const { documentUrl } = route.params;
    console.log({documentUrl})

  return (
    <View style={{ flex: 1 }}>
      <Text>PDF Viewer</Text>
      <Pdf
        source={{ uri: documentUrl, cache: true }}
        onLoadComplete={(numberOfPages, filePath) => {
          console.log(`Number of pages: ${numberOfPages}`);
        }}
        onPageChanged={(page, numberOfPages) => {
          console.log(`Current page: ${page}`);
        }}
        onError={(error) => {
          console.log(error);
        }}
        style={{ flex: 1 }}
      />
    </View>
  );
};

export default PdfScreen;
