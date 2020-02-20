import React from "react";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link} from "react-router-dom";
import EventsList from "./EventsList";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}))

const EventsScreen = () => {
    const classes = useStyles();

    useFirestoreConnect(() => [{
        collection: 'events',
        limitTo: 10
    }])

    const events = useSelector(({ firestore: { ordered } }) => ordered.events)

    if (!isLoaded(events)) {
        return null
    }

    if (isEmpty(events)) {
        return 'Events list is empty'
    }

    return (
        <Container maxWidth="md">
            <Link to={'/events/create'} style={{ textDecoration: 'none' }}><Button className={classes.margin} variant="contained" disableElevation color="primary">Create Event</Button></Link>
            <EventsList events={events}/>
        </Container>
    )
}

export default EventsScreen