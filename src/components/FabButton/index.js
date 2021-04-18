import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Animated, Alert } from 'react-native';
import { AntDesign, Entypo, Octicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


export default function FabButton() {
    const navigation = useNavigation();

    const [animation, setAnimation] = useState(new Animated.Value(0));
    const [open, setOpen] = useState(0);   
    const [nameCurtir, setNameCurtir] = useState("hearto"); 

    function toggleMenu() {
       
        const toValue = open ? 0 : 1
        
        Animated.spring(animation, {
            toValue,
            friction: 6,
            useNativeDriver: true,
        }).start();

        setOpen(!open);
    }

    function curtir() {
       
        if(nameCurtir === "heart"){
            setNameCurtir("hearto");
            alert('Você descurtiu!')
        } else {
            setNameCurtir("heart");
            alert('Você curtiu!')
        }
        
    }

    
    function irTarefa() {
        navigation.navigate('Tasks');
    }

    function irCamera() {
        setOpen(!open);
        navigation.navigate('Camera');
    }


    const likeStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -190]
                })
            }
        ]
    }

    const tarefaStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -130]
                })
            }
        ]
    }


    const cameraStyle = {
        transform: [
            { scale: animation },
            {
                translateY: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -70]
                })
            }
        ]
    }

    const rotation = {
        transform: [
            {
                rotate: animation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ["0deg", "45deg"]
                })
            }
        ]
    }
    

  return (    
    
    <View style={[styles.container]}>

        <TouchableWithoutFeedback onPress={() => curtir()}>
            <Animated.View style={[styles.button, styles.submenu, likeStyle]}>
                <AntDesign name={nameCurtir} size={20} color="#fff"/>
            </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => irTarefa()}>
            <Animated.View style={[styles.button, styles.submenu, tarefaStyle]}>
                <Octicons name="tasklist" size={20} color="#fff" />
            </Animated.View>
        </TouchableWithoutFeedback>
        
        <TouchableWithoutFeedback onPress={() => irCamera()}>
            <Animated.View style={[styles.button, styles.submenu, cameraStyle]}>
                <Entypo name="camera" size={20} color="#fff"/>
            </Animated.View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={() => toggleMenu()}>
            <Animated.View style={[styles.button, styles.menu, rotation]}>
                <AntDesign name="plus" size={24} color="#fff"/>
            </Animated.View>
        </TouchableWithoutFeedback>

    </View>
   );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'absolute',
        bottom: 80, right: 60
    },
    button: {
        position: 'absolute',
        width: 60,
        height: 60,
        borderRadius: 60/2,
        justifyContent: 'center',
        alignItems: 'center',
        shadowRadius: 10,
        shadowColor: '#00213B',
        shadowOpacity: 0.3,
        shadowOffset: {
            height: 10,
        }
    },
    menu: {
        backgroundColor: '#024578',
    },
    submenu: {
        width: 48,
        height: 48,
        borderRadius: 48/2,
        backgroundColor: '#3b0a66',
    }
});