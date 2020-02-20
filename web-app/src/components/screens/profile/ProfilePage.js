import React from "react";
import UserDetails from "./UserDetails";
import UserEventList from "./UserEventList";

function ProfilePage() {

    const user = {
        firstName: 'Sean',
        lastName: 'McNally',
        email: 'seanmcnally@outlook.com'
    }

    const events = [
        {title: 'Event title', description: 'Event description'},
        {title: 'Event title', description: 'Event description'},
        {title: 'Event title', description: 'Event description'},
        {title: 'Event title', description: 'Event description'},
        {title: 'Event title', description: 'Event description'},
        {title: 'Event title', description: 'Event description'}
    ]

    return (
      <div>
          <UserDetails user={user}/>
          <UserEventList events={events}/>
      </div>
    );
}

export default ProfilePage;