import React, {useState} from "react";
import { useParams } from 'react-router-dom'
import {Container, Button, Typography, Card, CardContent} from "@material-ui/core";
import {useSelector} from "react-redux";
import {isLoaded, useFirestore, useFirestoreConnect} from "react-redux-firebase";
import {makeStyles} from "@material-ui/core/styles";
import moment from "moment";
import * as firebase from "firebase";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles({
    card: {
        minWidth: 275,
        marginBottom: 12,
    },
    title: {
        fontSize: 14,
    },
    mBottom: {
        marginBottom: 12,
    },
});

function AttendeeStatusPage() {
    const [late, setLate] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [lateTime, setLateTime] = useState(0);

    const handleLate = () => {
        setLate(true);
    };

    const handleSubmitted = () => {
        setSubmitted(true);
    };

    const handleLateTime = e => {
        setLateTime(e.target.value());
    };

    const handleDone = () => {
        setLate(false);
        setSubmitted(false);
    }

    const now = new Date().getTime();
    let date = new Date(2020,3,14, 12, 59, 5).getTime();


    const classes = useStyles();

    const { eventID, attendeeID } = useParams();

    console.log(eventID, attendeeID);

    const firestore = useFirestore();

    useFirestoreConnect(() => [
        { collection: 'events', doc: eventID},
        { collection: 'events', doc: eventID, subcollections: [{ collection: 'attendees', doc: attendeeID }] }
    ])

    const attendee = useSelector(({ firestore: { data } }) => data.events && data.events[eventID] && data.events[eventID].attendees && data.events[eventID].attendees[attendeeID]);
    const event = useSelector(({ firestore: { data } }) => data.events && data.events[eventID]);

     /*if(event.canStartArriving){
        date = Date(event.canStartArriving).getTime();
    }*

    if (!isLoaded(attendee)) {
        return null
    }


    console.log(attendee)

/*    function onClick(e) {
        const {readyArrive, readyDepart} = user;

        if (new Date().getHours() < 18) {
            firestore.update(`attendees/${attendeeID}`,{ readyArrive: !readyArrive})
                .then(() => {
                    console.log("Successfully set readyArrive to " + !readyArrive)
                })
        } else {
            firestore.update(`attendees/${attendeeID}`,{ readyDepart: !readyDepart})
                .then(() => {
                    console.log("Successfully set readyDepart to " + !readyDepart)
                })
        }

    }*/

    const ready = () => {
        firestore
            .collection('events')
            .doc(eventID)
            .collection('attendees')
            .doc(attendeeID)
            .update({
                tags: firebase.firestore.FieldValue.arrayUnion("AccountedFor")
            })
            .then(r => console.log(r))
            .catch(err => console.log(err))
    }

    const notReady = () => {
        firestore
            .collection('events')
            .doc(eventID)
            .collection('attendees')
            .doc(attendeeID)
            .update({
                tags: firebase.firestore.FieldValue.arrayRemove("AccountedFor")
            })
            .then(r => console.log(r))
            .catch(err => console.log(err))
    }

    return(
        <Container maxWidth="sm">

            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {attendee.email}
                    </Typography>
                    <Typography variant="h5" component="h2">
                        {attendee.firstName} {attendee.lastName}
                    </Typography>
                </CardContent>
                {/*<CardActions>
                <Button size="small">Learn More</Button>
            </CardActions>*/}
            </Card>

            {!attendee.tags &&
                <Button className={classes.mBottom} variant="contained" color="primary" onClick={ready}>
                    Ready to leave
                </Button>
            }

            {attendee.tags && !attendee.tags.includes("AccountedFor") &&
                <Button className={classes.mBottom} variant="contained" color="primary" onClick={ready}>
                    Ready to leave
                </Button>
            }

            {attendee.tags && attendee.tags.includes("AccountedFor") && date <= now &&
            <div>
                <Typography className={classes.mBottom} variant="h5">
                    You're all set!
                </Typography>

                <Typography className={classes.mBottom} variant="body1" color="textSecondary">
                    If anything changes click below, otherwise we'll be at the mountain soon!
                </Typography>

                <Button variant="contained" onClick={notReady}>Wait I'm not Ready</Button>
            </div>
            }

            {attendee.tags && attendee.tags.includes("AccountedFor") && date > now &&
            <div>
                <Typography className={classes.mBottom} variant="h5">
                    You're too early!
                </Typography>

                <Typography className={classes.mBottom} variant="body1" color="textSecondary">
                    Click below and wait.
                </Typography>

                <Button variant="contained" onClick={notReady}>Go back</Button>
            </div>
            }
{/*            {((!readyArrive && new Date().getHours() < 18) || (!readyDepart && new Date().getHours() >= 18)) &&
            <Button className={classes.mBottom} variant="contained" color="primary" onClick={onClick}>
                Ready to leave
            </Button>
            }*/}

{/*            {((readyArrive && new Date().getHours() < 18) || (readyDepart && new Date().getHours() >= 18)) &&
            <div>
                <Typography className={classes.mBottom} variant="h5">
                    You're all set!
                </Typography>

                <Typography className={classes.mBottom} variant="body1" color="textSecondary">
                    If anything changes click below, otherwise we'll be at the mountain soon!
                </Typography>

                <Button variant="contained" onClick={onClick}>Wait I'm not Ready</Button>
            </div>
            }*/}

            {console.log(late)}
            {console.log(submitted)}

            {!late &&
            <div>
                <form>
                   <Button className={classes.mBottom} variant="contained" color="primary" onClick={handleLate}>
                       Running late?
                   </Button>
                </form>
            </div>

            }

            {console.log(late)}
            {console.log(submitted)}

            {late && !submitted &&
                <div>
                    <Typography className={classes.mBottom} variant="h5">
                        How many minute late will you be?
                    </Typography>

                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField
                            id="title-input"
                            label="Title"
                            variant="filled"
                            onChange={handleLateTime}
                        />

                        <Button className={classes.mBottom} variant="contained" color="primary" onClick={handleSubmitted}>
                            Submit
                        </Button>
                    </form>
                </div>
            }

            {console.log(late)}
            {console.log(submitted)}

            {late && submitted &&
            <div>
                <Typography className={classes.mBottom} variant="h5">
                    Thanks!
                </Typography>
                <Button className={classes.mBottom} variant="contained" color="primary" onClick={handleDone}>
                    Done
                </Button>
            </div>
            }

        </Container>
    )


}

export default AttendeeStatusPage