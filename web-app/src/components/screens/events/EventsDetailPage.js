import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container} from "@material-ui/core";
import {connect, useSelector} from "react-redux";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import AttendeesList from "./attendees/AttendeesList";
import SettingsIcon from '@material-ui/icons/Settings';
import Chip from "@material-ui/core/Chip";
// import QrReader from 'react-qr-reader';
import QrReader from 'react-qr-scanner'
import Example from "../../Example";
import TestQR from "../../TestQR";
import TheButton from "../../../playground/sam/TheButton";
import {removeTags} from "../../../redux/actions/eventActions";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AppBarHeader from "../../nav/AppBarHeader";

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

const EventsDetailPage = ({eventID, removeTags, history}) => {
    const classes = useStyles();
    const [tab, setTab] = React.useState(0);

    useFirestoreConnect(() => [
        {collection: 'events', doc: eventID},
        {collection: 'events', doc: eventID, subcollections: [{collection: 'attendees'}]}
    ])

    let event = useSelector(({firestore: {data}}) => data.events && data.events[eventID])
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
        if (tags[tag] === null) {
            tagsArray = [...tagsArray, {tag: tag, count: 0}]
        }
    });

    const handleScan = (data) => {
        console.log(data)
    }

    const handleError = (err) => {
        console.log(err)
    }

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    return (
        <div>
            <AppBarHeader
                title="Event Details"
                end={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            history.push("/events/" + eventID + "/settings")
                        }}
                        className={classes.margin}
                        color="inherit"
                        aria-label="settings"
                    >
                        <SettingsIcon />
                    </IconButton>
                }
            />
            <Container maxWidth="md">
                <h1>{event.title}</h1>
                <p>{event.description}</p>

                <h3>Total attendees: {Object.values(event.attendees).length}</h3>
                <div className={classes.chips}>
                    {tagsArray && tagsArray.map(item =>
                        <TheButton key={item.tag} label={item.tag + ': ' + item.count}
                                   color={mTags.includes(item.tag) ? "primary" : "default"} onClick={() => {
                            console.log("SOMETHING:" + item.tag);
                            if (mTags.includes(item.tag)) {
                                console.log("DELETE");
                                let values = mTags;
                                delete values[values.indexOf(item.tag)];
                                filter_array(values);
                            } else {
                                console.log("ADD");
                                let values = mTags;
                                values.push(item.tag);
                                filter_array(values);
                            }
                            console.log(mTags)
                        }}
                                   onDelete={() => {
                                       console.log("TODO: Make this delete: EVENT DETAILS PAGE LINE 141");
                                       removeTags(eventID, item.tag);
                                   }}/>
                    )}
                </div>
                <Paper square>
                    <Tabs
                        value={tab}
                        indicatorColor="primary"
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="disabled tabs example"
                    >
                        <Tab label="Active" />
                        <Tab label="Signups" />
                        <Tab label="Waitlist" />
                        <Tab label="Scan QR" />
                    </Tabs>
                </Paper>
                {tab === 0 && <AttendeesList eventID={eventID} attendees={Object.values(event.attendees)}
                                             tags={mTags}/>}
                {tab === 1 && <div><h1>Signups List</h1><AttendeesList eventID={eventID} attendees={Object.values({'c@ctoverton.com': {email: "c@ctoverton.com", firstName: "Christian", lastName: "Overton"},
                    'sam@sam.com': {email: "sam@sam.com", firstName: "Samuel", lastName: "Snyder"}})}
                                                  tags={mTags}/></div> }
                {tab === 2 && <div><h1>Waitlist</h1><AttendeesList eventID={eventID} attendees={Object.values({'sean@McNally.com': {email: "sean@McNally.com", firstName: "Sean", lastName: "McNally"}})}
                    tags={mTags}/></div>}
                {tab === 3 && <TestQR/>}

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

export default connect(mapState, {removeTags: removeTags})(EventsDetailPage)