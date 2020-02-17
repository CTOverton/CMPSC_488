import React from "react";
import {Container} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import TheButton from "../examples/TheButton";
import Form2 from "../examples/Form2";

function Dashboard() {

    return(
        <Container maxWidth="md">
            <Divider />
            <TheButton/>
            <Form2/>
        </Container>
    )
}

export default Dashboard