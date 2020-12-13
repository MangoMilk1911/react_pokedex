import React from 'react'
import { Button } from "@material-ui/core"

export default function Pagination({ goToNextPage, goToPreviousPage }) {
    return (
        <>
            {goToPreviousPage && <Button variant="contained" color="primary" onClick={goToPreviousPage}>Previous</Button>}
            {goToNextPage && <Button variant="contained" color="primary" onClick={goToNextPage}>Next</Button>}
        </>
    )
}
