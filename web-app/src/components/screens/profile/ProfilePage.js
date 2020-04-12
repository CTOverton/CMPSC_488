import React from "react";
import UserDetails from "./UserDetails";
import {connect, useSelector} from "react-redux";
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import IconButton from "@material-ui/core/IconButton";
import AppBarHeader from "../../nav/AppBarHeader";
import makeStyles from "@material-ui/core/styles/makeStyles";
import SettingsIcon from '@material-ui/icons/Settings';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import clsx from "clsx";
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import {withRouter} from "react-router-dom";
import {logoutUser} from "../../../redux/actions/authActions";
import EventsList from "../events/EventsList";

const useStyles = makeStyles(theme => ({
    margin: {
        margin: theme.spacing(1),
    },
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
}));

const ProfilePage = ({logout, history}) => {
    const classes = useStyles();
    const [state, setState] = React.useState({
        right: false,
    });

    // TODO: Change Query to get relevant events for given user
    useFirestoreConnect(() => [{
        collection: 'events',
        orderBy: ["createdAt", "desc"],
        limitTo: 10
    }]);

    const profile = useSelector(state => state.firebase.profile);
    const events = useSelector(({ firestore: { ordered } }) => ordered.events);

    console.log(profile);

    if(!isLoaded(profile)){
        return null
    }

    if(isEmpty(profile)){
        return <h1>Not logged in</h1>
    }

    if (!isLoaded(events)) {
        return null
    }

    if (isEmpty(events)) {
        return <h1>Events list is empty</h1>
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const list = (anchor) => (
        <div
            className={clsx(classes.list, {
                [classes.fullList]: anchor === 'top' || anchor === 'bottom',
            })}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                <ListItem button key={'Settings'} onClick={() => {history.push("/profile/settings")}}>
                    <ListItemIcon>
                        <SettingsIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Settings'} />
                </ListItem>
            </List>
            <Divider />
            <List>
                <ListItem button key={'Logout'} onClick={() => {logout()}}>
                    <ListItemIcon>
                        <ExitToAppIcon />
                    </ListItemIcon>
                    <ListItemText primary={'Logout'} />
                </ListItem>
            </List>
        </div>
    );

    return (
      <div>
          <AppBarHeader
              title="Profile"
              end={
                  <IconButton
                      edge="end"
                      onClick={toggleDrawer('right', true)}
                      color="inherit"
                      aria-label="settings"
                  >
                      <SettingsIcon />
                  </IconButton>
              }
          />
          <SwipeableDrawer
              anchor={'right'}
              open={state['right']}
              onClose={toggleDrawer('right', false)}
              onOpen={toggleDrawer('right', true)}
          >
              {list('right')}
          </SwipeableDrawer>

          <UserDetails user={profile}/>
          <EventsList events={events}/>
      </div>
    );
};

const mapDispatch = {logout: logoutUser};

export default connect(undefined, mapDispatch)(withRouter(ProfilePage))