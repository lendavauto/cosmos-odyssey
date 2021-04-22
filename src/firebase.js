import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyBlNB9IggfJiR4gwG-HzdlgwMxpczQHcRY',
  authDomain: 'cosmos-odyssey.firebaseapp.com',
  projectId: 'cosmos-odyssey',
  storageBucket: 'cosmos-odyssey.appspot.com',
  messagingSenderId: '567548864294',
  appId: '1:567548864294:web:d8d2870dee2565f2e403e7',
  measurementId: 'G-1E3GE728WC',
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
