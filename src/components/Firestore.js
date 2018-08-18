import firebase from "firebase";

var config = {
  apiKey: "AIzaSyBZ4IdWsf6a8RZjA7cUUeWu6pUnp4C4VeM",
  authDomain: "react-todo-7bf4c.firebaseapp.com",
  databaseURL: "https://react-todo-7bf4c.firebaseio.com",
  projectId: "react-todo-7bf4c",
  storageBucket: "react-todo-7bf4c.appspot.com",
  messagingSenderId: "888856262121"
};
firebase.initializeApp(config);

const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

export default db;
