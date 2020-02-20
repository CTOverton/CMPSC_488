import React from "react";
import List from "@material-ui/core/List";
import AttendeesListItem from "./AttendeesListItem";

const AttendeesList = ({attendees}) => {

    const attendeesList = [];

    for (let [key, value, index] of Object.entries(attendees)) {
        attendeesList[index] = {id: key, ...value}
    }

    return (
        <List component="nav">
            <h1>Attendees List</h1>
            {Object.values(attendeesList).map((attendee) =>
                <AttendeesListItem attendee={attendee} key={attendee.id}/>
            )}
        </List>
    )
}

export default AttendeesList