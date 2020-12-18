import React from 'react'
import { Button, makeStyles } from "@material-ui/core"

const useStyles = makeStyles(() => ({
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        height: 48,
        padding: '0 30px',
        justifyContent: 'center',
        alignContent: 'center',
        // fontSize: 24,
    },
}));

export default function Pagination({ goToNextPage, goToPreviousPage }) {

    const classes = useStyles();

    return (
        <>
            {goToPreviousPage && <Button className={classes.button} variant="contained" color="primary" onClick={goToPreviousPage}>Previous</Button>}
            {goToNextPage && <Button className={classes.button} variant="contained" color="primary" onClick={goToNextPage}>Next</Button>}
        </>
    )
}
