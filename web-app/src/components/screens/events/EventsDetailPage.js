import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container} from "@material-ui/core";
import {createEvent, deleteEvent, updateEvent} from "../../../redux/actions/eventActions";
import {connect, useSelector} from "react-redux";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import AttendeesList from "./attendees/AttendeesList";
import Chip from "@material-ui/core/Chip";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
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

    let tags = {};

    console.log("Attendees")

    Object.values(event.attendees).forEach(attendee => {
        console.log(attendee.firstName + ',' + attendee.lastName + ',' + attendee.email + ',' + attendee.tags)

        if (attendee.tags) {
            attendee.tags.forEach(tag => {
                if (tags[tag]) {
                    tags[tag] += 1;
                } else {
                    tags[tag] = 1;
                }
            })
        }
    })

    let tagsArray = [];
    for (let [key, value] of Object.entries(tags)) {
        tagsArray = [...tagsArray, {tag: key, count: value}]
    }

    return (
        <Container maxWidth="md">
            <h1>{event.title}</h1>
            <p>{event.description}</p>

            <h3>Total attendees: {Object.values(event.attendees).length}</h3>
            <div className={classes.chips}>
                { tagsArray && tagsArray.map(item =>
                    <Chip key={item.tag} label={item.tag + ': ' + item.count} />
                )}
            </div>


            <AttendeesList attendees={Object.values(event.attendees)}/>
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