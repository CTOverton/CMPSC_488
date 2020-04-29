import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {withRouter} from "react-router-dom";
import moment from "moment";
import defaultImg from "../../../assets/Default Image.png";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {storage} from "firebase";

const useStyles = makeStyles(theme => ({
    image: {
        margin: 20,
        width: 200,
        height: 200,
        objectFit: 'cover'
    },
}));

const EventsListItem = ({event, history}) => {
    const classes = useStyles();
    const [eventImg, setEventImg] = React.useState(null);

    let img = storage().ref(`eventImages/${event.id}`);

    img.getDownloadURL()
        .then(url => {
            setEventImg(url);
        })
        .catch(function(error) {
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

    return(
        <ListItem button onClick={() => {return history.push('/events/' + event.id)}}>
            <img className={classes.image} src={eventImg ? eventImg : defaultImg} alt=""/>
            <ListItemText primary={event.title} secondary={moment(event.createdAt.toDate()).calendar()} />
        </ListItem>
    )
}

export default withRouter(EventsListItem)