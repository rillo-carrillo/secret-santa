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

const queryEmail = (participante)=>{
  const entry ={
    user:participante.user,
    email:participante.email
  }
  return db.collection('participante')
     .where('email','==',participante.email)
    .get()
    .then((doc)=>
    { 
      if(doc.empty){
        return db.collection('participante')
                      .add(entry)
                      .then(doc=>{
                        return doc.id
                      })
      }
      else{
        return doc.docs.map(doc=>
          { 
              if(!doc.exists){
                return db.collection('participante')
                          .add(entry)
                          .then(doc=>{return doc.id})
              } else {
                return doc.id
              }
              
          })
      }
    })
    .catch(err => console.error(err))
}

const createEvento = (evento)=>{
  const entry ={
    admin:evento.admin,
    participantes:evento.participantes
  }
  return db.collection('evento').add(entry).then(doc=>{return doc.id})
}
const mezclarParticipantes=(array)=>{
    const length = array.length - 1
    for (let i = length; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    
    
}
const crearParejas=(pairs,array)=>{
  const length = array.length - 1
  for (let i = 0; i <= length; i++){
    if(i===length){
      pairs.push({
        santa:array[i].fid,
        target:array[0].fid
      })
    } else {
      pairs.push({
        santa:array[i].fid,
        target:array[i+1].fid
      })
    }
  }
}
export function createEventAndUsers(users){
  const event = {
      admin:'',
      participantes:[],
      id:''
    }
  const participantes=[users.admin]
  users.participantes.map(participante=>{
    
    participantes.push(participante)
  })
  return Promise.resolve(
  participantes.map(participante=>{
    queryEmail(participante).then(id=>{
      if(Array.isArray(id)){
        participante.fid=id[0]
      } else{
        participante.fid=id
      }
      })
  })).then(()=>{
    event.admin=participantes[0].fid
    mezclarParticipantes(participantes)
    crearParejas(event.participantes,participantes)
    return createEvento(event).then(id=> {
      participantes.map(participante=>{
        fetch(`https://us-central1-secretsanta-e2385.cloudfunctions.net/sendMail?dest=${participante.email}&event=${id}&user=${participante.fid}`)
        .then(res=>console.log(res))
      })
      return {
        ...event,
        id:id
    }
  })
  })
}
