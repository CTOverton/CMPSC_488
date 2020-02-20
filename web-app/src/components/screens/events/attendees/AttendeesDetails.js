import React from "react";
import {connect, useSelector} from "react-redux";
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {Container} from "@material-ui/core";

const AttendeesDetails = ({eventID, attendeeID}) => {

    useFirestoreConnect(() => [
        { collection: 'events', doc: eventID, subcollections: [{ collection: 'attendees', doc: attendeeID }] }
    ])


    const attendee = useSelector(({ firestore: { data } }) => data.events && data.events[eventID] && data.events[eventID].attendees && data.events[eventID].attendees[attendeeID])

    if (!isLoaded(attendee)) {
        return null
    }

    return(
        <Container maxWidth="md">
            <h1>{attendee.firstName + ' ' + attendee.lastName}</h1>
            <p>{attendee.email}</p>
        </Container>
    )
}

const mapState = (state, ownProps) => {
    const eventID = ownProps.match.params.eventID;
    const attendeeID = ownProps.match.params.attendeeID;
    return {
        eventID: eventID,
        attendeeID: attendeeID
    }
}

// const mapDispatch = {createEvent: createEvent, updateEvent: updateEvent, deleteEvent: deleteEvent}

export default connect(mapState, undefined)(AttendeesDetails)