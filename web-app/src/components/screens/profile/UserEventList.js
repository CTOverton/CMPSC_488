import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import {ListItemText} from "@material-ui/core";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import EventIcon from "@material-ui/icons/Event";

function UserEventList({events}) {

    console.log("wow");

    return (
      <List component="nav" style={{textAlign: "center"}}>

          {events.map( (event, index) =>
              <ListItem key={index} >
                  <ListItemAvatar>
                      <Avatar alt={event.title}>
                          <EventIcon/>
                      </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={event.title} secondary={event.description}/>
              </ListItem>
          )}
      </List>
    );
}

export default UserEventList;