import React from "react";
import EventsListItem from "./EventsListItem";
import List from "@material-ui/core/List";

const EventsList = ({events}) => {
    return (
        <List>
            {events.map((event) =>
                <EventsListItem event={event} key={event.id}/>
            )}
        </List>
    )
}

export default EventsList