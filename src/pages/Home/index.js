import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

import FabButton from '../../components/FabButton';

export default function App() {
  
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Bem vindo a tela home</Text>
        <FabButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  text: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 17,
    color: '#00213B'
  }
});