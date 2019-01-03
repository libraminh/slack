import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

var config = {
  apiKey: "AIzaSyCaQfj5Wmy5xtN9VDFrrR6K_Yu-KXyQZcI",
  authDomain: "slack-minhle.firebaseapp.com",
  databaseURL: "https://slack-minhle.firebaseio.com",
  projectId: "slack-minhle",
  storageBucket: "slack-minhle.appspot.com",
  messagingSenderId: "838070845499"
};
firebase.initializeApp(config);

export default firebase