import firebase from 'firebase'
const firebaseConfig = {
    apiKey: "AIzaSyAVc0hg8xSXjC9lO6YDs9w25VofuW7UXI8",
    authDomain: "entry-io.firebaseapp.com",
    databaseURL: "https://entry-io.firebaseio.com",
    projectId: "entry-io",
    storageBucket: "entry-io.appspot.com",
    messagingSenderId: "907534174855",
    appId: "1:907534174855:web:2092c02f494d7fb0540622",
    measurementId: "G-EJW642G1MK"
  };
var fire = firebase.initializeApp(firebaseConfig);
export default fire;