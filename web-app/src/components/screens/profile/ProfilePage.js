import React from "react";
import UserDetails from "./UserDetails";
import UserEventList from "./UserEventList";

import eventIcon from "../../../assets/snowy_mountain.jpg" ;
import {useSelector} from "react-redux";
import {isEmpty, isLoaded} from "react-redux-firebase";

function ProfilePage() {

    const profile = useSelector(state => state.firebase.profile);

    console.log(profile);

    if(!isLoaded(profile)){
        return null;
    }

    if(isEmpty(profile)){
        return(
            <h1>Not logged in</h1>
        )
    }

    const events = [
        {title: 'Event title', description: 'Event description', eventPic: eventIcon},
        {title: 'Event title', description: 'Event description', eventPic: ''},
        {title: 'Event title', description: 'Event description', eventPic: ''},
        {title: 'Event title', description: 'Event description', eventPic: ''},
        {title: 'Event title', description: 'Event description', eventPic: ''},
        {title: 'Event title', description: 'Event description', eventPic: ''},
        {title: 'Event title', description: 'Event description', eventPic: ''}
    ];

    return (
      <div>
          <UserDetails user={profile}/>
          <UserEventList events={events}/>
      </div>
    );
}

export default ProfilePage;