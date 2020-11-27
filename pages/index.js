import Head from 'next/head'
import {getDBData} from '../firebase/init'
import {Container} from '@material-ui/core'
import Formulario from '../components/creation'

export default function Home() {

  return (
    <div >
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxWidth='sm'>
        <Formulario/>
      </Container>
      
    </div>
  )
}
