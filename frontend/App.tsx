import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import DetailScreen from './screens/DetailScreen';
import ListDocuments from './screens/ListDocuments';
import PdfScreen from './screens/PdfScreen';

type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  ListDocuments: undefined;
  PdfScreen: { documentUrl: string };  // Correctly type the parameters
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
        <Stack.Screen name="ListDocuments" component={ListDocuments} />
        <Stack.Screen name="PdfScreen" component={PdfScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
