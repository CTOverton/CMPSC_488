import React from "react";
import {Container} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {signUp} from "../../redux/actions/authActions";
import {connect} from "react-redux";

const Signup = ({signUp}) => {

    const test = () => {
        console.log(signUp({temp: 'test'}))
    }

    return(
        <Container maxWidth="md">
            <h1>Signup</h1>
            <Button onClick={test}>Click</Button>
        </Container>
    )
}

// const mapState = {}
const mapDispatch = {signUp}

export default connect(undefined, mapDispatch)(Signup)