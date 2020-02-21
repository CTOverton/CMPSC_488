import React from "react";
import {connect, useSelector} from "react-redux";
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {Container} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EventsListItem from "../EventsListItem";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
}));

const AttendeesDetails = ({eventID, attendeeID}) => {
    const classes = useStyles();

    useFirestoreConnect(() => [
        { collection: 'events', doc: eventID, subcollections: [{ collection: 'attendees', doc: attendeeID }] }
    ])


    const attendee = useSelector(({ firestore: { data } }) => data.events && data.events[eventID] && data.events[eventID].attendees && data.events[eventID].attendees[attendeeID])

    if (!isLoaded(attendee)) {
        return null
    }

    const handleDelete = () => {
        console.log("delete")
    }

    return(
        <Container maxWidth="md">
            <h1>{attendee.firstName + ' ' + attendee.lastName}</h1>
            <p>{attendee.email}</p>

            <div className={classes.chips}>
                {attendee.tags && attendee.tags.map((tag) =>
                    <Chip key={tag} label={tag} onDelete={handleDelete}/>
                )}
            </div>
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