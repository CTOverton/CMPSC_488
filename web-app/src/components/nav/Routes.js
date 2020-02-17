import React from "react";
import Dashboard from "../screens/Dashboard";
import test from "../screens/test"
import {Switch, Route} from "react-router-dom";

function Routes() {
    return(
        <Switch>
            <Route exact path='/' component={Dashboard} />
            <Route exact path='/SamTest' component={test}/>
            {/*<Route path='/project/:id' component={ProjectDetails} />
                <Route exact path='/program/:id' component={ProgramDetails} />
                <Route exact path='/program/:id/apply' component={Apply} />*/}

            {/*<Route path='/signin' component={SignIn} />
                <Route path='/signup' component={SignUp} />*/}
        </Switch>
    )
}

export default Routes