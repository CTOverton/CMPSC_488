import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container} from "@material-ui/core";
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

    let event = useSelector(({ firestore: { data } }) => data.events && data.events[eventID])
    const auth = useSelector(state => state.firebase.auth)

    // Show a message while items are loading
    if (!isLoaded(event) || !isLoaded(auth) || !isLoaded(event.attendees)) {
        return null
    }

    if (isEmpty(auth)) {
        // Todo redirect
        return <h2>You do not have access to manage this event</h2>
    }
    const {uid} = auth;

    if (event.createdBy !== uid) {
        // Todo redirect
        return <h2>You do not have access to manage this event</h2>
    }

    let tags = {};

    console.log(event)
    if (isLoaded(event.attendees) && isEmpty(event.attendees)) {
        event = {
            ...event,
            attendees: []
        };
    } else {
        console.log(event.attendees)
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
    }



    let tagsArray = [];
    let filter_array = [];
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
                    <Chip key={item.tag} label={item.tag + ': ' + item.count} onClick={() => {
                        console.log("SOMETHING:" + item.tag);
                        if (filter_array.includes(item.tag)){
                            console.log("DELETE");
                            delete filter_array[filter_array.indexOf(item.tag)];
                        }
                        else{
                            console.log("ADD");
                            filter_array.push(item.tag);}
                        console.log(filter_array)
                    }}/>
                )}
            </div>

            <AttendeesList eventID={eventID} attendees={Object.values(event.attendees)} tags={filter_array}/>
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