import React from "react";
import Avatar from "@material-ui/core/Avatar";
import {Container} from "@material-ui/core";

function UserDetails ({user}) {

    return (
        <Container style={{textAlign: "center", marginTop: "10px"}}>
            <Avatar style={{display: "inline-block", lineHeight: "40px"}} alt={user.username}>{user.username.charAt(0)}</Avatar>
            <h1>{user.username}</h1>
            <p>{user.email}</p>
        </Container>
    );
}

export default UserDetails;