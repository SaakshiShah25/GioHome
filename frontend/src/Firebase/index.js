  
import firebase from "firebase/app";
import "firebase/storage";

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyCHfNjphvsolE8QClPnbEyiUn-86qsDDfg",
    authDomain: "gio-home-caf53.firebaseapp.com",
    databaseURL: "https://gio-home-caf53.firebaseio.com",
    projectId: "gio-home-caf53",
    storageBucket: "gio-home-caf53.appspot.com",
    messagingSenderId: "284016223531",
    appId: "1:284016223531:web:7fe9e38432ead6a1dcd16e",
    measurementId: "G-JQ4E104NJM"
  };

// Initialize Firebase

firebase.initializeApp(firebaseConfig);

const storage = firebase.storage();

export { firebase, storage as default };