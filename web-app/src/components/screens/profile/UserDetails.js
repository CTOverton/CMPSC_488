import React from "react";
import Avatar from "@material-ui/core/Avatar";

function UserDetails ({user}) {

    return (
        <div>
            <Avatar alt={user.firstName + ' ' + user.lastName}>{user.firstName.charAt(0) + user.lastName.charAt(0)}</Avatar>
            <h1>{user.firstName} {user.lastName}</h1>
            <p>{user.email}</p>
        </div>
    );
}

export default UserDetails;