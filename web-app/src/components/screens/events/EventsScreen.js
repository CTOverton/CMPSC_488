import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import EventsList from "./EventsList";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import AppBarHeader from "../../nav/AppBarHeader";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const EventsScreen = ({history}) => {
    const classes = useStyles();

    useFirestoreConnect(() => [{
        collection: 'events',
        orderBy: ["createdAt", "desc"],
        limitTo: 10
    }]);

    const events = useSelector(({ firestore: { ordered } }) => ordered.events);

    if (!isLoaded(events)) {
        return null
    }

    if (isEmpty(events)) {
        return 'Events list is empty'
    }

    return (
        <div>
            <AppBarHeader
                title="Events"
                end={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            history.push("/events/create")
                        }}
                        className={classes.margin}
                        color="inherit"
                        aria-label="add"
                    >
                        <AddBoxIcon />
                    </IconButton>
                }
            />
            <EventsList events={events}/>
        </div>
    )
};

export default EventsScreen