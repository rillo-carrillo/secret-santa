import React, { useState } from 'react'
import {TextField,Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
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
        email:''
    }
    const [users,setUsers] = useState(
        {admin:participante,
        participantes:[
        ],
        count:0
    })
    const handleAdmin=({target:{name,value}})=>{
        if(name==="user"){
            participante.user=value;
        }
        if(name==='email'){
            participante.email=value
        }
        setUsers({...users,
        admin:participante})
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
    const classes = useStyles()
    console.log(users)
    return (
        
        <div>
            <form className={classes.root} noValidate autoComplete='false'>
                <Admin handleAdmin={handleAdmin}/>
                <Button onClick={addParticipante}>Agregar Participante</Button>
                <br/>
                {users.participantes.map(part=>{
                    return <Participantes key={part.id} id={part.id} handleParticipante={handleParticipante}/>
                })}
                
            </form>
            <Button variant='contained'>Enviar</Button>
        </div>
    )
}

export default Formulario
