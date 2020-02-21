import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";

const AttendeesListItem = ({attendee}) => {
    return(
        <Link to={'/events/' + 'BzKsxLo5cxhRgBETI0wS' + '/attendee/' + attendee.email} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
                <ListItemText primary={attendee.firstName + ' ' + attendee.lastName} />
            </ListItem>
        </Link>
    )
}

export default AttendeesListItem