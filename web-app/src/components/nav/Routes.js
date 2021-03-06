import React from "react";
import {Switch, Route, Redirect} from "react-router-dom";
import SeanTemplateComponent from "../../playground/sean/SeanTemplateComponent";
import SignUp from "../auth/SignUp";
import Login from "../auth/Login";
import SamPlayground from "../../playground/sam/SamPlayground"
import EventsScreen from "../screens/events/EventsScreen";
import EventsCreateScreen from "../screens/events/EventsCreateScreen";
import EventsDetailPage from "../screens/events/EventsDetailPage";
import AttendeesDetails from "../screens/events/attendees/AttendeesDetails";
import ProfilePage from "../screens/profile/ProfilePage";
import AttendeeStatusPage from "../screens/events/attendees/AttendeeStatusPage";
import AttendeesAdd from "../screens/events/attendees/AttendeesAdd";
import {useSelector} from "react-redux";
import {isEmpty, isLoaded} from "react-redux-firebase";
import ProfileSettings from "../screens/profile/ProfileSettings";
import EventsSettingsPage from "../screens/events/EventsSettingsPage";
import EventsSignupPage from "../screens/events/EventsSignupPage";
import EventsSignupThanks from "../screens/events/EventsSignupThanks";
import EventManageScreen from "../screens/events/EventManageScreen";
import CSV_Import from "../screens/CSV/CSV_Import";
import ProfileEdit from "../screens/profile/ProfileEdit";
import Browse from "../screens/browse/Browse";
import TestQR from "../TestQR";

function PrivateRoute({ children, ...rest }) {
    const auth = useSelector(state => state.firebase.auth);
    return (
        <Route
            {...rest}
            render={({ location }) =>
                isLoaded(auth) && !isEmpty(auth) ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location }
                        }}
                    />
                )
            }
        />
    );
}

function Routes() {
    return(
        <Switch>
            {/* TODO: Fix private routes messing up history push*/}
            {/*<PrivateRoute exact path='/'><EventsScreen /></PrivateRoute>*/}
            <Route exact path='/' component={EventsScreen} />

            <Route path='/signup' component={SignUp} />
            <Route path='/login' component={Login} />

            <Route exact path='/events' component={EventsScreen} />
            <Route exact path='/event/create' component={EventsCreateScreen} />
            <Route exact path='/event/:eventID' component={EventsDetailPage} />
            <Route exact path='/event/:eventID/manage' component={EventManageScreen} />
            <Route exact path='/event/:eventID/settings' component={EventsSettingsPage} />
            <Route exact path='/event/:eventID/list/:listID/import' component={CSV_Import} />
            <Route exact path='/event/:eventID/list/:listID/scan' component={TestQR} />

            <Route exact path='/browse' component={Browse} />

            <Route exact path='/profile' component={ProfilePage} />
            <Route exact path='/profile/edit' component={ProfileEdit} />
            <Route exact path='/profile/settings' component={ProfileSettings} />
        </Switch>
    )
}

export default Routes