import React, {useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Modal, Image, ActivityIndicator } from 'react-native';
import { Camera } from 'expo-camera';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

export default function App() {
  const camRef = useRef(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission, setHasPermission] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect (() => {
    (async () => {
      const {status} = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();

    (async () => {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === 'granted');
    })();

  }, []);

  if(hasPermission === null){
    return <View />
  }

  if(hasPermission === false){
    return <Text>Scesso negado!</Text>
  }

  async function takePicture(){
    setLoading(true);
    if(camRef){
      const data = await camRef.current.takePictureAsync();
      setCapturedPhoto(data.uri);
      setOpen(true);
      console.log(data);
      setLoading(false);
    }
  }

  async function savePicture(){
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
    .then(() => {
      alert('Foto salva com sucesso!');
      setOpen(false);
    })
    .catch( error => {
      console.log('err', error);
    })
  }



  return (
    <SafeAreaView style={styles.container}>
      <Camera 
        style={{ flex: 1 }}
        type={type}
        ref={camRef}
      >

        <View style={styles.viewCamera}>
          <TouchableOpacity
           style={{ 
             position: 'absolute',
             bottom: 20,
             left: 20,
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back
              );
            }}
          >
            <Ionicons name="camera-reverse-sharp" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

    </Camera>

    <TouchableOpacity style={styles.button} onPress={ takePicture }>
      { loading ? (
          <ActivityIndicator size={20} color="#e38812" />
        ) : (
          
            <FontAwesome name="camera" size={23} color="#e38812"/>
          
        )
      }
    </TouchableOpacity>
    
    

    { capturedPhoto && 
      <Modal
        animationType="slide"
        transparent={false}
        visible={open}
      >
        <View style={styles.viewModal}>
         
          <View style={styles.viewImagePreview}>
            <TouchableOpacity style={{ margin: 5 }} onPress={ ()=> setOpen(false)}>
              <FontAwesome name="window-close" size={30} color="#ff0000"/>
            </TouchableOpacity>

            <TouchableOpacity style={{ margin: 5 }} onPress={ ()=> savePicture()}>
              <FontAwesome name="upload" size={30} color="#121212"/>
            </TouchableOpacity>
          </View>

          <Image 
            style={styles.image}
            source={{ uri: capturedPhoto }}
          />

        </View>
      </Modal>
    }

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  viewCamera: {
    flex: 1, 
    backgroundColor: 'transparent', 
    flexDirection: 'row'
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    margin: 20,
    borderRadius: 10,
    height: 50
  },
  viewModal: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    margin: 20,
  },
  viewImagePreview: {
    width: "100%", 
    margin: 10, 
    flexDirection: 'row', 
    justifyContent: "space-between" 
  },
  image: {
    width: '100%', 
    height: 450, 
    borderRadius: 5
  }
});
