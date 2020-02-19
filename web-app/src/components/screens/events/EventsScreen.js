import React from "react";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";
import EventsList from "./EventsList";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}))

const EventsScreen = () => {
    const classes = useStyles();

    return (
        <Container maxWidth="md">
            <Link to={'/events/create'} style={{ textDecoration: 'none' }}><Button className={classes.margin} variant="contained" disableElevation color="primary">Create Event</Button></Link>
            <EventsList/>
        </Container>
    )
}

export default EventsScreen