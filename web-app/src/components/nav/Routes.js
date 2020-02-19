import React from "react";
import Dashboard from "../screens/Dashboard";
import {Switch, Route, Redirect} from "react-router-dom";
import SeanTemplateComponent from "../../playground/sean/SeanTemplateComponent";
import SignUp from "../auth/SignUp";
import Login from "../auth/Login";
import SamPlayground from "../../playground/sam/SamPlayground"
import EventsScreen from "../screens/events/EventsScreen";
import EventsCreateScreen from "../screens/events/EventsCreateScreen";
import EventsPage from "../screens/events/EventsPage";

function Routes() {
    return(
        <Switch>
            <Route exact path='/' component={Dashboard} />

            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />

            <Route exact path='/events' component={EventsScreen} />
            <Route exact path='/events/create' component={EventsCreateScreen} />
            <Route exact path='/events/:id' component={EventsPage} />

            <Route path='/playground/sam' component={SamPlayground} />
            <Route path='/playground/sean' component={SeanTemplateComponent} />
            {/*<Route path='/project/:id' component={ProjectDetails} />
                <Route exact path='/program/:id' component={ProgramDetails} />
                <Route exact path='/program/:id/apply' component={Apply} />*/}

            {/*<Route path='/signin' component={SignIn} />
                <Route path='/signup' component={SignUp} />*/}
        </Switch>
    )
}

export default Routes