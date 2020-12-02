import { Paper, Typography } from '@material-ui/core'
import React from 'react'
import styles from './Details.module.css'
function Details({semail,suser,temail,tuser}) {
    return (
        <div>
            <Paper elevation={3} className={styles.spacing}>
                <Typography variant={"h2"}>
                    {suser}
                </Typography>
                <Typography variant={"body1"}>
                    {semail}
                </Typography>
            </Paper>
            <Paper elevation={3} className={styles.spacing}>
                <Typography variant={"h2"}>
                    {tuser}
                </Typography>
                <Typography variant={"body1"}>
                    {temail}
                </Typography>
            </Paper>
        </div>
    )
}

export default Details
