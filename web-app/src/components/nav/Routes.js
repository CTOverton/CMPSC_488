import React from "react";
import Dashboard from "../screens/Dashboard";
import {Switch, Route} from "react-router-dom";
import SamTemplateComponent from "../../playground/sam/SamTemplateComponent";
import SeanTemplateComponent from "../../playground/sean/SeanTemplateComponent";

function Routes() {
    return(
        <Switch>
            <Route exact path='/' component={Dashboard} />

            <Route exact path='/playground/sam' component={SamTemplateComponent} />
            <Route exact path='/playground/sean' component={SeanTemplateComponent} />

            {/*<Route path='/project/:id' component={ProjectDetails} />
                <Route exact path='/program/:id' component={ProgramDetails} />
                <Route exact path='/program/:id/apply' component={Apply} />*/}

            {/*<Route path='/signin' component={SignIn} />
                <Route path='/signup' component={SignUp} />*/}
        </Switch>
    )
}

export default Routes