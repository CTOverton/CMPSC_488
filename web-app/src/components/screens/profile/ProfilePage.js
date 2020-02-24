import React from "react";
import UserDetails from "./UserDetails";
import UserEventList from "./UserEventList";

import eventIcon from "../../../assets/snowy_mountain.jpg" ;

function ProfilePage() {

    const user = {
        firstName: 'Sean',
        lastName: 'McNally',
        email: 'seanmcnally@outlook.com'
    };

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
          <UserDetails user={user}/>
          <UserEventList events={events}/>
      </div>
    );
}

export default ProfilePage;