import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {Link} from "react-router-dom";

const EventsListItem = ({event}) => {
    return(
        <Link to={'/events/' + event.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ListItem button>
                <ListItemText primary={event.title} />
            </ListItem>
        </Link>
    )
}

export default EventsListItem