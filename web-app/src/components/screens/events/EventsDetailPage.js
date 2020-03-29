import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container} from "@material-ui/core";
import {connect, useSelector} from "react-redux";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import AttendeesList from "./attendees/AttendeesList";
import Chip from "@material-ui/core/Chip";
// import QrReader from 'react-qr-reader';
import QrReader from 'react-qr-scanner'
import Example from "../../Example";
import TestQR from "../../TestQR";
import EventsDetailPageHeader from "./EventsDetailPageHeader";
import TheButton from "../../../playground/sam/TheButton";
import {removeTags} from "../../../redux/actions/eventActions";

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

    const [mTags, filter_array] = React.useState([])

    // Show a message while items are loading
    if (!isLoaded(event) || !isLoaded(auth) || !isLoaded(event.attendees)) {
        return null
    }
    console.log("TAGS");
    console.log(event.tags);

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
    for (let [key, value] of Object.entries(tags)) {
        tagsArray = [...tagsArray, {tag: key, count: value}]
    }
    event.tags.forEach(tag => {
        if(tags[tag] === null){
            tagsArray = [...tagsArray, {tag: tag, count: 0}]
        }
    });

    const handleScan = (data) => {
        console.log(data)
    }

    const handleError = (err) => {
        console.log(err)
    }

    return (
        <div>
            <EventsDetailPageHeader eventID={eventID}/>
            <Container maxWidth="md">
                <h1>{event.title}</h1>
                <p>{event.description}</p>

            <h3>Total attendees: {Object.values(event.attendees).length}</h3>
            <div className={classes.chips}>
                { tagsArray && tagsArray.map(item =>
                    <TheButton key={item.tag} label={item.tag + ': ' + item.count} color={mTags.includes(item.tag) ? "primary" : "default"} onClick={() => {
                        console.log("SOMETHING:" + item.tag);
                        if (mTags.includes(item.tag)){
                            console.log("DELETE");
                            let values = mTags;
                            delete values[values.indexOf(item.tag)];
                            filter_array(values);
                        }
                        else{
                            console.log("ADD");
                            let values = mTags;
                            values.push(item.tag);
                            filter_array(values);
                        }
                        console.log(mTags)
                    }}
                    onDelete={()=>{
                        console.log("TODO: Make this delete");
                    }}/>
                )}
            </div>
                <AttendeesList eventID={eventID} attendees={Object.values(event.attendees)} tags={mTags}/>
            <TestQR/>
            </Container>
        </div>
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