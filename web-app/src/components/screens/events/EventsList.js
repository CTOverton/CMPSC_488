import React from "react";
import EventsListItem from "./EventsListItem";
import List from "@material-ui/core/List";
import {isEmpty, isLoaded} from "react-redux-firebase";
import Skeleton from "@material-ui/lab/Skeleton";
import ListItem from "@material-ui/core/ListItem";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme => ({
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

const EventsList = ({events}) => {
    const classes = useStyles();

    if (!isLoaded(events)) {
        const skeletons = [0,1,2];
        return(
            <div>
                {skeletons.map(id =>
                    <ListItem key={id}>
                        <div className={classes.container}>
                            <Skeleton className={classes.box1} variant="rect" animation="wave" width={200} height={200} />
                            <div className={classes.box2}>
                                <Skeleton animation="wave" width="100%" style={{ marginBottom: 6 }}/>
                                <Skeleton animation="wave" width="100%"/>
                            </div>
                        </div>
                    </ListItem>
                )}
            </div>
        )
    }
    if (isEmpty(events)) {return 'Events list is empty'}

    return (
        <List>
            {events.map((event) =>
                <EventsListItem event={event} key={event.id}/>
            )}
        </List>
    )
}

export default EventsList