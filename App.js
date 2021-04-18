import React from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

console.disableYellowBox=true;

import Home from './src/pages/Home';
import Camera from './src/pages/Camera';
import Tasks from './src/pages/Tasks';

const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
       <StatusBar backgroundColor="#024578" barStyle="ligth-content"/>
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{headerShown: false}}
        />
        <Stack.Screen name="Camera" component={Camera} />
        <Stack.Screen name="Tasks" component={Tasks} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}