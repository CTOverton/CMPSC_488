import React from "react";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import {withRouter} from "react-router-dom";
import moment from "moment";

const EventsListItem = ({event, history}) => {

    return(
        <ListItem button onClick={() => {return history.push('/events/' + event.id)}}>
            <ListItemText primary={event.title} secondary={moment(event.createdAt.toDate()).calendar()} />
        </ListItem>
    )
}

export default withRouter(EventsListItem)