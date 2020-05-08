import React, {useEffect} from 'react'
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AppBarHeader from "../../nav/AppBarHeader";
import defaultImg from "../../../assets/Default Image.png";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Container from "@material-ui/core/Container";
import {Typography} from "@material-ui/core";
import {storage} from "firebase";

const useStyles = makeStyles(theme => ({
    left: {
        textAlign: 'left'
    },
    image: {
        margin: '0px 20px 0px 0px',
        width: 140,
        height: 140,
        objectFit: 'cover'
    },
    container: {
        width: "100%",
    },
    shelf: {
        display: 'flex',
        overflow: 'auto',
        whiteSpace: 'nowrap',
    }
}));

const Shelf = ({history, title, events}) => {
    const classes = useStyles();

    return (
        <Container>
            <h1 className={classes.left}>{title}</h1>
            <div className={classes.shelf}>
                {events.map(event =>
                    <EventCard key={event.id} history={history} eventID={event.id} title={event.title} date={event.createdAt}/>
                )}
            </div>
        </Container>
    );
};

const EventCard = ({history, eventID, title, date}) => {
    const classes = useStyles();
    const [eventImg, setEventImg] = React.useState(null);
    const [hasFetched, setHasFetched] = React.useState(false);

    useEffect(() => {
        if (eventImg === null && hasFetched === false) {
            let img = storage().ref(`eventImages/${eventID}`);

            img
                .getDownloadURL()
                .then(url => {
                    setHasFetched(true);
                    setEventImg(url);
                })
                .catch(error => {
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


    return (
        <div onClick={() => history.push('/event/' + eventID)}>
            <img className={classes.image} src={eventImg ? eventImg : defaultImg} alt=""/>
            <h3 className={classes.left}>{title}</h3>
            <Typography className={classes.left} color="textSecondary">{date}</Typography>
        </div>
    )
}

export default Shelf