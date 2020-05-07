import React, {useEffect} from 'react'
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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AppBarHeader from "../../nav/AppBarHeader";
import {storage} from "firebase";

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
        height: 200,
        objectFit: 'cover',
    },
    button: {
        margin: '24px 0px',
        width: 300
    }
}));

const EventsDetailPage = ({history, match}) => {
    const classes = useStyles();
    const eventID = match.params.eventID;
    const [eventImg, setEventImg] = React.useState(null);
    const [hasFetched, setHasFetched] = React.useState(false);

    useFirestoreConnect(() => [
        {collection: 'events', doc: eventID},
    ]);

    const event = useSelector(({firestore: {data}}) => data.events && data.events[eventID]);

    useEffect(() => {
        if (eventImg === null && hasFetched === false && isLoaded(event)) {
            let img = storage().ref(`eventImages/${eventID}`);

            img.getDownloadURL()
                .then(url => {
                    setHasFetched(true);
                    setEventImg(url);
                })
                .catch(function(error) {
                    setHasFetched(true);
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                        default:
                            break;
                    }
                });
        }
    });

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
                        aria-label="back"
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
                            history.push('/event/'+ eventID +'/manage')
                        }}
                        color="inherit"
                        aria-label="manage"
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
            />
            <Container>
                <img className={classes.image} src={eventImg ? eventImg : defaultImg} alt=""/>
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