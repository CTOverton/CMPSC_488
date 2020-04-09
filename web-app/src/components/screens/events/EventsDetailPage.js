import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Container} from "@material-ui/core";
import {connect, useSelector} from "react-redux";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import AttendeesList from "./attendees/AttendeesList";
import SettingsIcon from '@material-ui/icons/Settings';
import TestQR from "../../TestQR";
import TheButton from "../../blades/TheButton";
import {removeTags} from "../../../redux/actions/eventActions";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import IconButton from "@material-ui/core/IconButton";
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
        {collection: 'events', doc: eventID, subcollections: [{collection: 'attendees'}]},
        {collection: 'eventTags', doc: eventID},
        {collection: 'tags'}
    ])

    let event = useSelector(({firestore: {data}}) => data.events && data.events[eventID])
    let eventTags = useSelector(({firestore: {data}}) => data.eventTags && data.eventTags[eventID]);
    let allTags = useSelector(({firestore: {data}}) => data.tags);
    const auth = useSelector(state => state.firebase.auth)

    const [mTags, filter_array] = React.useState([])

    // Show a message while items are loading
    if (!isLoaded(event) || !isLoaded(auth) || !isLoaded(event.attendees) || !isLoaded(eventTags) || !isLoaded(allTags)) {
        return null
    }
    console.log("TAGS");
    console.log(eventTags);

    if (isEmpty(auth)) {
        // Todo redirect
        return <h2>You do not have access to manage this event</h2>
    }

    const {uid} = auth;

    if (event.createdBy !== uid) {
        // Todo redirect
        return <h2>You do not have access to manage this event</h2>
    }

    let tags = [];
    let attendeeTags = {};

    if (isLoaded(event.attendees) && isEmpty(event.attendees)) {
        event = {
            ...event,
            attendees: []
        };
    } else {
        const keys = Object.keys(eventTags.tags);
        for (let counter = 0; counter < keys.length; counter++) {
            let attendeeIDs = Object.keys(allTags[eventTags.tags[keys[counter]]].attendees);
            tags = [...tags,
                {
                    tag: keys[counter],
                    count: attendeeIDs.length,
                    id: eventTags.tags[keys[counter]]
                }
            ]
            console.log(attendeeIDs);
            console.log(attendeeTags);
            for (let attendee in [attendeeIDs]) {
                console.log(attendeeIDs[attendee]);
                if (attendeeTags[attendeeIDs[attendee]] === undefined) {
                    attendeeTags[attendeeIDs[attendee]] = [];
                }
                attendeeTags[attendeeIDs[attendee]].push(keys[counter]);
            }
        }
    }

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
                        <SettingsIcon/>
                    </IconButton>
                }
            />
            <Container maxWidth="md">
                <h1>{event.title}</h1>
                <p>{event.description}</p>

                <h3>Total attendees: {Object.values(event.attendees).length}</h3>
                <div className={classes.chips}>
                    {tags && tags.map(item =>
                        <TheButton key={item.tag} label={item.tag + ': ' + item.count}
                                   color={mTags.includes(item.tag) ? "primary" : "default"}
                                   onClick={() => {
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
                                       let temps = {};
                                       for(const c in tags){
                                           if (tags[c].tag !== item.tag){
                                               temps[tags[c].tag] =  tags[c].id
                                           }
                                       }
                                       console.log(temps);
                                       console.log("TODO: Make this delete: EVENT DETAILS PAGE LINE 141");
                                       removeTags(eventID, item, temps);
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
                        <Tab label="Active"/>
                        <Tab label="Signups"/>
                        <Tab label="Waitlist"/>
                        <Tab label="Scan QR"/>
                    </Tabs>
                </Paper>
                {tab === 0 && <AttendeesList eventID={eventID}
                                             attendees={Object.values(event.attendees)}
                                             tags={mTags} attendeeTags={attendeeTags}/>}
                {tab === 1 && <div><h1>Signups List</h1><AttendeesList eventID={eventID}
                                                                       attendees={Object.values({
                                                                           'c@ctoverton.com': {
                                                                               email: "c@ctoverton.com",
                                                                               firstName: "Christian",
                                                                               lastName: "Overton"
                                                                           },
                                                                           'sam@sam.com': {
                                                                               email: "sam@sam.com",
                                                                               firstName: "Samuel",
                                                                               lastName: "Snyder"
                                                                           }
                                                                       })}
                                                                       tags={mTags}
                                                                       attendeeTags={attendeeTags}/></div>}
                {tab === 2 && <div><h1>Waitlist</h1><AttendeesList eventID={eventID} attendees={Object.values({
                    'sean@McNally.com': {
                        email: "sean@McNally.com",
                        firstName: "Sean",
                        lastName: "McNally"
                    }
                })}
                                                                   tags={mTags} attendeeTags={attendeeTags}/></div>}
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