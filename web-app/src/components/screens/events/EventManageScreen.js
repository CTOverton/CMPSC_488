import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AppBarHeader from "../../nav/AppBarHeader";
import Container from "@material-ui/core/Container";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";


const EventManageScreen = ({history, match}) => {
    const eventID = match.params.eventID;

    useFirestoreConnect(() => [
        {collection: 'events', doc: eventID},
        {collection: 'eventTags', doc: eventID},
    ]);

    const event = useSelector(({firestore: {data}}) => data.events && data.events[eventID]);
    const eventTags = useSelector(({firestore: {data}}) => data.eventTags && data.eventTags[eventID]);

    if (!isLoaded(event) || !isLoaded(eventTags)) {return null}

    console.log(event, eventTags)

    return (
        <div>
            <AppBarHeader
                start={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            history.goBack()
                        }}
                        color="inherit"
                        aria-label="back"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                }
                title="Manage Event"
                end={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            console.log("Change Event settings")
                        }}
                        color="inherit"
                        aria-label="settings"
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <Container>
                yeet
            </Container>
        </div>
    );
};

export default EventManageScreen