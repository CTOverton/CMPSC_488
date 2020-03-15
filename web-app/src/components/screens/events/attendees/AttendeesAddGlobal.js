import React from "react";
import {useFirestore, useFirestoreConnect} from "react-redux-firebase";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Chip from "@material-ui/core/Chip";
import * as firebase from "firebase";

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

const AttendeesAddAGlobal = ({eventID, attendeeID, attendeeTags, eventTags}) => {
    const classes = useStyles();
    const firestore = useFirestore();
    const diff = eventTags.filter(x => !attendeeTags.includes(x));

    useFirestoreConnect(() => [
        { collection: 'events', doc: eventID, subcollections: [{ collection: 'attendees', doc: attendeeID }] }
    ])

    return(
        <>
            <div className={classes.chips}>
                {diff && diff.map((tag) =>
                    <Chip key={tag} label={tag} onClick={() => {
                        firestore
                            .collection('events')
                            .doc(eventID)
                            .collection('attendees')
                            .doc(attendeeID)
                            .update({
                                tags: firebase.firestore.FieldValue.arrayUnion(tag)
                            })
                            .then(r => console.log(r))
                            .catch(err => console.log(err))
                    }
                    }/>
                )}
            </div>
        </>
    )
}

// const mapDispatch = {createEvent: createEvent, updateEvent: updateEvent, deleteEvent: deleteEvent}

export default AttendeesAddAGlobal