import firebase from 'firebase'
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBWhUx9Ggv1JLgHpEdSodZmFX753ghubUo",
  authDomain: "secretsanta-e2385.firebaseapp.com",
  databaseURL: "https://secretsanta-e2385.firebaseio.com",
  projectId: "secretsanta-e2385",
  storageBucket: "secretsanta-e2385.appspot.com",
  messagingSenderId: "712628646881",
  appId: "1:712628646881:web:b377cd81580824b43a98a0",
  measurementId: "G-9DPR4ZN462"
};

!firebase.apps.length && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

export const getDBData = () =>{
  db.collection('evento').get()
    .then(({docs}) => docs.map(doc=>{
      console.log(doc.id)//LAmX2UyFfQQgUH7ac8ex
      console.log(doc.data())
    }))
}