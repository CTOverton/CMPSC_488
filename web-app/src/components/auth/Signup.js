import React from "react";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {createUser} from "../../redux/actions/authActions";
import {connect} from "react-redux";

const Signup = ({createUser}) => {

    const test = () => {
        createUser(
            { email: 'testing@test.com', password: 'password'},
            { email: 'test@test.com', firstName: 'test', lastName: 'account' }
        )
    }

    return(
        <Container maxWidth="md">
            <h1>Signup</h1>
            <Button onClick={test}>Click</Button>
        </Container>
    )
}

// const mapState = {}
const mapDispatch = {createUser: createUser}

export default connect(undefined, mapDispatch)(Signup)