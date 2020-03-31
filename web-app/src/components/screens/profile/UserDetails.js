import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {Container} from "@material-ui/core";

function UserDetails ({user}) {

    return (
        <Container style={{textAlign: "center", marginTop: "10px"}}>
            <Avatar style={{display: "inline-block", lineHeight: "40px"}} alt={user.firstName + ' ' + user.lastName}>{user.firstName.charAt(0) + user.lastName.charAt(0)}</Avatar>
            <h1>{user.firstName} {user.lastName}</h1>
            <h2>{user.username}</h2>
            <p>{user.email}</p>
        </Container>
    );
}

export default UserDetails;