import React from 'react'
import {getDetails, getPaths} from '../../../../firebase/init'
import UserDetails from '../../../../components/user/index'
function User({details:{santa:{semail,suser},target:{temail,tuser}}}) {
    return (
        <div>
            <UserDetails semail={semail} suser={suser} temail={temail} tuser={tuser}/>
        </div>
    )
}
export async function getStaticPaths(){
    const path = await getPaths()
    console.log('static')
    console.log(path)
    const paths = []
    path.map(arr=>{
        return arr.map(path=>{
            paths.push({
                params: {
                    id:path.id,
                    uid:path.uid
                } 
            })
        })
    })
    return {
        paths,
        fallback:false
    }
}
export async function getStaticProps({params}){
    const {id,uid} = params  
    const details = await getDetails(id,uid)

    return { props: {
            details
        }
    }
}
export default User
