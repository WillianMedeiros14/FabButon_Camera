import * as firebase from 'firebase';
import 'firebase/database';

let firebaseConfig = {
    apiKey: "AIzaSyDEC2LiwUR9Xh9I1bDRKWGV_RDHIfykOPM",
    authDomain: "tarefa-5a7ec.firebaseapp.com",
    projectId: "tarefa-5a7ec",
    storageBucket: "tarefa-5a7ec.appspot.com",
    messagingSenderId: "512029211056",
    appId: "1:512029211056:web:7583eeb2eabef8ffa3be75",
    measurementId: "G-LVFH5PWFXW"
};
  // Initialize Firebase
if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export default firebase;