import React from "react";
import EventsList from "./EventsList";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import AppBarHeader from "../../nav/AppBarHeader";
import AddBoxIcon from "@material-ui/icons/AddBox";
import IconButton from "@material-ui/core/IconButton";

const EventsScreen = ({history}) => {

    useFirestoreConnect(() => [{
        collection: 'events',
        orderBy: ["createdAt", "desc"],
        limitTo: 10
    }]);

    const events = useSelector(({ firestore: { ordered } }) => ordered.events);

    return (
        <div>
            <AppBarHeader
                title="Events"
                end={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            history.push("/event/create")
                        }}
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