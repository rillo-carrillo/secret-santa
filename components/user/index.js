import { Grid } from '@material-ui/core'
import React from 'react'
import Details from './Details'
import styles from './Index.module.css'
function UserDetails(props) {
    return (
        <div className={styles.container}>
            <Grid container spacing={3}>
                <Grid item xs={0} md={2}/>
                <Grid items xs={12} md={8}>
                    <Details {...props}/>
                </Grid>
                <Grid item xs={0} md={2}/>

            </Grid>
        </div>
    )
}

export default UserDetails
