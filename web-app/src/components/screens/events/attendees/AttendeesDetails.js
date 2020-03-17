import React, {useState} from "react";
import {connect, useSelector} from "react-redux";
import {isLoaded, isEmpty, useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {Container} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import * as firebase from "firebase";
import AttendeesAddGlobal from "./AttendeesAddGlobal";
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

const AttendeesDetails = ({eventID, attendeeID}) => {
    const classes = useStyles();
    const [inputVal, changeInput] = useState(null)
    const firestore = useFirestore()

    useFirestoreConnect(() => [
        { collection: 'events', doc: eventID, subcollections: [{ collection: 'attendees', doc: attendeeID }] }
    ])


    const attendee = useSelector(({ firestore: { data } }) => data.events && data.events[eventID] && data.events[eventID].attendees && data.events[eventID].attendees[attendeeID])
    const eventTags = useSelector(({firestore: {data}}) => data.events && data.events[eventID] && data.events[eventID].tags)
    if (!isLoaded(attendee)) {
        return <div>Loading attendee</div>
    }
    if (isEmpty(attendee)) {
        return(
            <Container maxWidth="md">
                <h1>Attendee {attendeeID} not found</h1>
                <AttendeesAdd attendee={{email: attendeeID}}/>
            </Container>
        )
    }
    /*if (!isLoaded(eventTags)) {
        return null
    }*/

    // Todo: check if event exists


    const handleAddInput = e => {
        changeInput(e.target.value === '' ? null : e.target.value)
    }

    const handleAdd = () => {
        if (inputVal != null) {
            firestore
                .collection('events')
                .doc(eventID)
                .collection('attendees')
                .doc(attendeeID)
                .update({
                    tags: firebase.firestore.FieldValue.arrayUnion(inputVal)
                })
                .then(updateMasterTags(inputVal))
                .catch(err => console.log(err))
        }
    }

    function updateMasterTags(inputVal){
        firestore
            .collection('events')
            .doc(eventID)
            .update({
                tags: firebase.firestore.FieldValue.arrayUnion(inputVal)
            })
            .then(r => console.log(r))
            .catch(err => console.log(err))
    }

    return(
        <Container maxWidth="md">
            <h1>{attendee.firstName + ' ' + attendee.lastName}</h1>
            <p>{attendee.email}</p>
            <p>{attendee.phone}</p>

            <div className={classes.chips}>
                {attendee.tags && attendee.tags.map((tag) =>
                    <Chip key={tag} label={tag} onDelete={() => {
                        console.log("Deleting")
                        firestore
                            .collection('events')
                            .doc(eventID)
                            .collection('attendees')
                            .doc(attendeeID)
                            .update({
                                tags: firebase.firestore.FieldValue.arrayRemove(tag)
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