import React, {useEffect} from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {withRouter} from "react-router-dom";
import moment from "moment";
import defaultImg from "../../../assets/Default Image.png";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {storage} from "firebase";
import Skeleton from "@material-ui/lab/Skeleton";

const useStyles = makeStyles(theme => ({
    image: {
        margin: 20,
        width: 200,
        height: 200,
        objectFit: 'cover'
    },
    container: {
        width: "100%",
    },
    box1: {
        float: 'left',
    },
    box2: {
        paddingLeft: 16,
        overflow: 'auto',
    },
}));

const EventsListItem = ({event, history}) => {
    const classes = useStyles();
    const [eventImg, setEventImg] = React.useState(null);
    const [hasFetched, setHasFetched] = React.useState(false);

    useEffect(() => {
        if (eventImg === null && hasFetched === false) {
            let img = storage().ref(`eventImages/${event.id}`);

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

    if (!eventImg) {
        return (
            <ListItem>
                <div className={classes.container}>
                    <Skeleton className={classes.box1} variant="rect" animation="wave" width={200} height={200} />
                    <div className={classes.box2}>
                        <Skeleton animation="wave" width="100%" style={{ marginBottom: 6 }}/>
                        <Skeleton animation="wave" width="100%"/>
                    </div>
                </div>
            </ListItem>
        )
    }

    return(
        <ListItem button onClick={() => {return history.push('/event/' + event.id)}}>
            <img className={classes.image} src={eventImg ? eventImg : defaultImg} alt=""/>
            <ListItemText primary={event.title} secondary={moment(event.createdAt.toDate()).calendar()} />
        </ListItem>
    )
}

export default withRouter(EventsListItem)