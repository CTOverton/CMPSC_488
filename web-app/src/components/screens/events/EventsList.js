import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}))

const EventsList = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <h1>Events List</h1>
        </Container>
    )
}

export default EventsList