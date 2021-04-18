import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Feather } from '@expo/vector-icons';


export default function TaskList( {data, deleteItem, editItem}) {
 return (
   <View style={styles.container}>
       <TouchableOpacity style={{ marginRight: 10 }} onPress={ ()=> deleteItem(data.key) }>
        <Feather 
            name="trash" color="#fff" size={20}
        />
       </TouchableOpacity>

       <View style={{ paddingRight: 15 }}>
           <TouchableWithoutFeedback onPress={ ()=> editItem(data) }>
            <Text style={{ color: '#FFF', paddingRight: 10 }}> {data.nome}</Text>
           </TouchableWithoutFeedback>
          
       </View>
   </View>
  );
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: '#00213B',
      alignItems: 'center',
      marginBottom: 10,
      padding: 10,
      borderRadius: 5
    }
});