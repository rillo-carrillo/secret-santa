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
const findSanta=(part,uid)=>{
  return part.santa === uid
}
export async function getDetails(id,uid){
  return db.collection('evento').doc(id)
  .get()
  .then(doc=>{
    const {participantes} = doc.data()
    const santa = participantes.find(party => party.santa === uid)
    return db.collection('participante').doc(santa.santa).get()
    .then(santaDB=>{
      return db.collection('participante').doc(santa.target).get()
      .then(target=>{
        return {
          santa:{
            semail:santaDB.data().email,
            suser:santaDB.data().user
          },
          target:{
            temail:target.data().email,
            tuser:target.data().user
          }
        }  
      })
    })
  })
}
const createEvento = async (evento)=>{
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
export async function createEventAndUsers(users){
  const event = {
    admin:'',
    participantes:[],
    id:''
  }
  const participantes=[users.admin]
  users.participantes.map(participante=>{  
    participantes.push(participante)
  })
  const fids = await Promise.all(participantes.map(participante=>{
    return queryEmail(participante)
  })).catch(error=>console.log(error))
  fids.map((fid,i)=>{
    if(Array.isArray(fid)){
      participantes[i].fid=fid[0]
    } else {
      participantes[i].fid=fid
    }
  })
  event.admin=participantes[0].fid
  mezclarParticipantes(participantes)
  crearParejas(event.participantes,participantes)
  const res = await createEvento(event).then(id=> {
        
        return {
          ...event,
          id:id
      }}).catch(error=>console.log(error))
  return res
}
export async function getPaths(){
  return db.collection('evento').get().then(doc=>{
    return doc.docs.map(evento=>{
      const id = evento.id
      const { participantes } = evento.data()
      const paths= participantes.map(participante=>{
        return {
          id: id,
          uid: participante.santa
        }
      })
      return paths
    })
  })
}
