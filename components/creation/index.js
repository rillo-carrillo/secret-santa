import React, { useState } from 'react'
import {TextField,Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {createEventAndUsers} from '../../firebase/init'
const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
function Admin({handleAdmin}){
    return (
        <>
            <TextField type="text" variant='outlined' label='Admin' name='user' onChange={handleAdmin}/>
            <TextField type="email" variant='outlined' label='Correo' name='email' onChange={handleAdmin}/>
        </>
    )
}
function Participantes({id,handleParticipante}){
    return (
        <>
            <TextField type="text" variant='outlined' label='Participante' name='user' onChange={(e)=>handleParticipante(id,e)}/>
            <TextField type="email" variant='outlined' label='Correo' name='email'  onChange={(e)=>handleParticipante(id,e)}/>
        </>
    )
}
function Formulario() {
    let participante = { 
        id:'',
        user:'',
        email:'',
        fid:''
    }
    const [users,setUsers] = useState(
        {admin:participante,
        participantes:[
        ],
        count:0
    })
    const [status,setStatus] = useState()
    const handleAdmin=({target:{name,value}})=>{
        if(name==="user"){
            users.admin.user=value;
        }
        if(name==='email'){
            users.admin.email=value
        }
        setUsers({...users})
    }
    const addParticipante=()=>{
        participante.id=users.count
        let parts = users.participantes
        parts.push(participante)
        setUsers({...users,
        participantes:parts,
        count:users.count+1})
    }
    const handleParticipante=(id,{target:{name,value}})=>{
        const participante = users.participantes[id]
        if(name==='user'){
            participante.user=value;
        }
        if(name==='email'){
            participante.email=value;
        }
        users.participantes[id]=participante
        setUsers({...users,
        })
    }
    const handleSubmit=()=>{
        if(users.admin.user.length>0 && users.admin.email.length>0){
            createEventAndUsers(users).then(event=>setStatus(event))
        }
    }

    const classes = useStyles()
    console.log(status)
    return (
        
        <div>
            <form className={classes.root} autoComplete='false'>
                {status?'Evento Creado '+status.id:''}
                <br/>
                <Admin handleAdmin={handleAdmin}/>
                <Button onClick={addParticipante} color="primary" variant="contained">Agregar Participante</Button>
                <br/>
                {users.participantes.map(part=>{
                    return <Participantes key={part.id} id={part.id} handleParticipante={handleParticipante}/>
                })}
                <br/>
                <Button variant='contained' disabled={users.count>0?false:true} onClick={handleSubmit}>Enviar</Button>
            </form>
            
        </div>
    )
}

export default Formulario
