import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EventsListItem from "./EventsListItem";
import List from "@material-ui/core/List";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}))

const EventsList = ({events}) => {
    //const classes = useStyles();

    console.log(events)

    return (
        <List component="nav">
            {/*<h1>Events List</h1>*/}
            {events.map((event) =>
                <EventsListItem event={event} key={event.id}/>
            )}
        </List>
    )
}

export default EventsList