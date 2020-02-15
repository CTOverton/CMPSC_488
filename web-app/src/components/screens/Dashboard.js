import React from "react";
import {Container} from "@material-ui/core";
import TemplateFirestoreDisplay from "../FirestoreTemplates/TemplateFirestoreDisplay";
import TemplateFirestoreAddItem from "../FirestoreTemplates/TemplateFirestoreAddItem";
import Divider from "@material-ui/core/Divider";
import Signup from "../auth/Signup";

function Dashboard() {

    return(
        <Container maxWidth="md">
            <h1>App Setup</h1>
            <Divider />
            <h2>Firestore Example</h2>
            <TemplateFirestoreDisplay/>
            <TemplateFirestoreAddItem/>
            <Divider/>
            <Signup/>
        </Container>
    )
}

export default Dashboard