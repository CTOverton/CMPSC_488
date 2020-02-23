import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {ListItemText} from "@material-ui/core";

function UserEventList({events}) {

    console.log("wow");

    return (
      <List component="nav">

          {events.map( (event, index) =>
              <ListItem key={index}>
                  <ListItemText primary={event.title} secondary={event.description}/>
              </ListItem>
          )}
      </List>
    );
}

export default UserEventList;