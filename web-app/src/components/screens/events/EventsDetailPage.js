import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container} from "@material-ui/core";
import {createEvent, deleteEvent, updateEvent} from "../../../redux/actions/eventActions";
import {connect, useSelector} from "react-redux";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import AttendeesList from "./attendees/AttendeesList";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}))

const EventsDetailPage = ({eventID}) => {
    const classes = useStyles();

    useFirestoreConnect(() => [
        { collection: 'events', doc: eventID },
        { collection: 'events', doc: eventID, subcollections: [{ collection: 'attendees' }] }
    ])

    const event = useSelector(({ firestore: { data } }) => data.events && data.events[eventID])

    // Show a message while items are loading
    if (!isLoaded(event)) {
        return null
    }

    if (!isLoaded(event.attendees)) {
        return null
    }

    return (
        <Container maxWidth="md">
            <h1>{event.title}</h1>
            <p>{event.description}</p>
            <AttendeesList attendees={event.attendees}/>
        </Container>
    )
}

const mapState = (state, ownProps) => {
    const id = ownProps.match.params.id;
    return {
        eventID: id
    }
}

// const mapDispatch = {createEvent: createEvent, updateEvent: updateEvent, deleteEvent: deleteEvent}

export default connect(mapState, undefined)(EventsDetailPage)