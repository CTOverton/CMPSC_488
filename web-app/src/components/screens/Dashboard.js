import React from "react";
import {Container} from "@material-ui/core";

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
        </Container>
    )
}

export default Dashboard