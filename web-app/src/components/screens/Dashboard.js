import React from "react";
import {Container} from "@material-ui/core";
import TemplateFirestoreDisplay from "../FirestoreTemplates/TemplateFirestoreDisplay";
import TemplateFirestoreAddItem from "../FirestoreTemplates/TemplateFirestoreAddItem";
import Divider from "@material-ui/core/Divider";
import BottomNav from "../nav/BottomNav";
import {connect, useSelector} from "react-redux";
import {isEmpty, isLoaded, populate} from "react-redux-firebase";
import {Redirect} from "react-router-dom";

/*
const Authorized = ({children}) => {
    const auth = useSelector(state => state.firebase.auth)
    if (!isLoaded(auth)) return null;
    if (isEmpty(auth)) return <Redirect to='/login' />;
    return children
}
*/

const Dashboard = () => {

    return(
        <Container maxWidth="md">
            <h1>Dashboard</h1>
            {/*            <h1>Dashboard</h1>
                <Divider />
                <h2>Firestore Example</h2>
                <TemplateFirestoreDisplay/>
                <TemplateFirestoreAddItem/>
                <Divider/>*/}
        </Container>
    )
}

export default Dashboard