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
        {collection: 'eventTags', doc:eventID},
        {collection: 'tags'}
        ])

    const attendee = useSelector(({ firestore: { data } }) => data.events && data.events[eventID] && data.events[eventID].attendees && data.events[eventID].attendees[attendeeID]);
    let event = useSelector(({ firestore: { data } }) => data.eventTags && data.eventTags[eventID])
    let allTags = useSelector(({firestore: {data} }) => data.tags);

    if (!isLoaded(attendee)) {
        return "Loading Attendees"
    }
    if (!isLoaded(event)) {
        return "Loading Event Details"
    }

    let has = []
    let has_not = []

    if (!isLoaded(allTags)) {
        return "Loading Tags"
    }
    else{
        let keys = Object.keys(event.tags);
        console.log(keys);
        console.log(event);
        for (let counter = 0; counter < keys.length; counter++){
            if(allTags[event.tags[keys[counter]]].attendees[attendeeID] !== undefined){
                has.push({tag: keys[counter], id: event.tags[keys[counter]]})
            }
            else{
                has_not.push({tag: keys[counter], id: event.tags[keys[counter]]})
            }
        }
    }
    console.log(has);
    console.log(has_not);

    if (isEmpty(attendee)) {
        return(
            <Container maxWidth="md">
                <h1>Attendee {attendeeID} not found</h1>
                <AttendeesAdd attendee={{email: attendeeID}}/>
            </Container>
        )
    }

    const handleAddInput = e => {
        changeInput(e.target.value === '' ? null : e.target.value)
    }

    const handleAdd = () => {
        if (inputVal != null) {
            console.log(eventID);
            console.log(inputVal);
            firestore
                .collection('tags')
                .add({
                    tag: inputVal,
                    attendees: {
                        [attendeeID]: true
                    }
                })
                .then(r => {
                    console.log(r);
                    console.log(r.im.path.segments[1])
                    firestore
                        .collection('eventTags')
                        .doc(eventID)
                        .update({
                            tags: {
                                ...event.tags,
                                [inputVal]: r.im.path.segments[1].toString()
                            }
                        })
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
                {has && has.map((item) =>
                    <Chip key={item.tag} label={item.tag} onDelete={() => {
                        let temp = [];
                        let tkeys = Object.keys(allTags[item.id].attendees);
                        for(let c = 0; c < tkeys.length; c++){
                            if(tkeys[c] !== attendeeID){
                                temp.push({[tkeys[c]]: true})
                            }
                        }
                        firestore
                            .collection('tags')
                            .doc(item.id)
                            .update({
                                attendees: temp
                            })
                            .then(() => {
                                console.log(item);
                                console.log(temp);
                                console.log(allTags[item.id].attendees);
                            })
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
                {has_not && has_not.map((item) =>
                    <Chip key={item.tag} label={item.tag} onClick={() => {
                        firestore
                            .collection('tags')
                            .doc(item.id)
                            .set({
                                attendees: {
                                    ...allTags[item.id].attendees,
                                    [attendeeID] : true
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