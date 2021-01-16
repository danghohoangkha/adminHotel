import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

import useStyles from './styles'

export default function CircularIndeterminate({ isOpen }) {
    const classes = useStyles();

    if (isOpen)
        return (
            <div className={classes.root} >
                <CircularProgress />
            </div >
        )
    else
        return <></>
}