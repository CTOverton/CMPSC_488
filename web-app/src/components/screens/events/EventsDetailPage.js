import React from 'react'
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Comments from "../comments/Comments";
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import defaultImg from "../../../assets/Default Image.png"
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import SettingsIcon from '@material-ui/icons/Settings';
import AppBarHeader from "../../nav/AppBarHeader";

const useStyles = makeStyles(theme => ({
    title: {
        textAlign: 'start'
    },
    subtitle: {
        textAlign: 'start'
    },
    image: {
        margin: 20,
        width: 200,
        height: 200
    },
    button: {
        margin: '24px 0px',
        width: 300
    }
}));

const EventsDetailPage = ({history, match}) => {
    const classes = useStyles();
    const eventID = match.params.eventID;

    useFirestoreConnect(() => [
        {collection: 'events', doc: eventID},
    ]);

    const event = useSelector(({firestore: {data}}) => data.events && data.events[eventID]);

    if (!isLoaded(event)) {return null}

    return (
        <div>
            <AppBarHeader
                start={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            // TODO: don't go back if prev page was create page
                            history.goBack()
                        }}
                        color="inherit"
                        aria-label="add"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                }
                title="Event Details"
                // TODO: don't show if not the event owner
                end={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            console.log("Go to event manage")
                        }}
                        color="inherit"
                        aria-label="add"
                    >
                        <SettingsIcon />
                    </IconButton>
                }
            />
            <Container>
                <img className={classes.image} src={defaultImg} alt=""/>
                <h2 className={classes.title}>{event.title}</h2>
                <Typography className={classes.subtitle} variant="subtitle1">{event.description}</Typography>
                <Button className={classes.button} variant="contained" disableElevation color="primary">Signup</Button>
                <Typography className={classes.subtitle} variant="subtitle1">Comments</Typography>
                <Comments eventID={eventID}/>
            </Container>
        </div>

    );
};

export default EventsDetailPage