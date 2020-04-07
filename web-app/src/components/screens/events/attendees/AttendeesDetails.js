import React, {useState} from "react";
import {connect, useSelector} from "react-redux";
import {isLoaded, isEmpty, useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {Container} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as firebase from "firebase";
import QRCode from "qrcode.react";
import AttendeesAdd from "./AttendeesAdd";

const useStyles = makeStyles(theme => ({
    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const AttendeesDetails = ({ eventID, attendeeID }) => {
    const classes = useStyles();
    const [inputVal, changeInput] = useState(null)
    const firestore = useFirestore();

    useFirestoreConnect(() => [
        { collection: 'events', doc: eventID },
        { collection: 'events', doc: eventID, subcollections: [{ collection: 'attendees', doc: attendeeID }]},
        {collection: 'eventTags', doc:eventID}
        ])

    const attendee = useSelector(({ firestore: { data } }) => data.events && data.events[eventID] && data.events[eventID].attendees && data.events[eventID].attendees[attendeeID]);
    let event = useSelector(({ firestore: { data } }) => data.eventTags && data.eventTags[eventID])

    if (!isLoaded(attendee)) {
        return "Loading Attendees"
    }
    if (!isLoaded(event)) {
        return "Loading Event Details"
    }
    if (isEmpty(event)){ //TODO: MAKE MORE STABLE
        event = {
            tags: []
        }
    }
    if (isEmpty(attendee)) {
        return(
            <Container maxWidth="md">
                <h1>Attendee {attendeeID} not found</h1>
                <AttendeesAdd attendee={{email: attendeeID}}/>
            </Container>
        )
    }
    console.log(event);
    const keys = Object.keys(event.tags);
    console.log(keys);
    let has = [];
    let has_not = [];
    for(let counter = 0; counter < keys.length; counter++){
        if(event.tags[keys[counter]].includes(attendeeID)){
            has.push(keys[counter]);
        }
        else{
            has_not.push(keys[counter]);
        }
    }

    const handleAddInput = e => {
        changeInput(e.target.value === '' ? null : e.target.value)
    }

    const handleAdd = () => {
        if (inputVal != null) {
            console.log(eventID);
            console.log(inputVal);
            firestore
                .collection('eventTags')
                .doc(eventID)
                .update({
                    tags: {
                        [inputVal]: [...event.tags[inputVal], attendeeID]
                    }
                })
        .catch(err => console.log(err))
        }
    }

    return(
        <Container maxWidth="md">
            <h1>{attendee.firstName + ' ' + attendee.lastName}</h1>
            <p>{attendee.email}</p>
            <p>{attendee.phone}</p>

            <div className={classes.chips}>
                {has && has.map((tag) =>
                    <Chip key={tag} label={tag} onDelete={() => {
                        console.log("Deleting")
                        firestore
                            .collection('eventsTags')
                            .doc(eventID)
                            .update({
                                tags: {
                                    [tag] : [...event.tags[tag] - attendeeID] //TODO FIX THIS
                                }
                            })
                            .then(r => console.log(r))
                            .catch(err => console.log(err))
                    }}/>
                )}
            </div>
            <TextField
                id="tag-input"
                label="Add Tag"
                onChange={handleAddInput}
            />
            <Button className={classes.margin} variant="contained" disableElevation color="primary" onClick={handleAdd}>Add Tag</Button>

            <div className={classes.chips}>
                {has_not && has_not.map((tag) =>
                    <Chip key={tag} label={tag} onClick={() => {
                        firestore
                            .collection('eventTags')
                            .doc(eventID)
                            .update({
                                tags: {
                                    [tag]: [...event.tags[tag], attendeeID]
                                }
                            })
                            .then(r => console.log(r))
                            .catch(err => console.log(err))
                    }
                    }/>
                )}
            </div>
            <QRCode value={JSON.stringify({
                eventID: eventID,
                attendeeID: attendeeID
            })}/>
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