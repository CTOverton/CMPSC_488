import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import EventIcon from '@material-ui/icons/Event';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import makeStyles from "@material-ui/core/styles/makeStyles";
import {Link, withRouter} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: 'fixed',
        bottom: 0,
        borderTop: '0.5px solid rgba(0, 0, 0, 0.2)'
    },
});

const BottomNav = ({history, location, match}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const {pathname} = location;

    if (pathname === "/login" || pathname === "/signup") {return null}

    // Todo: After direct link (ex: after login) make the correct corresponding navigation icon highlight

    return(
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                switch (newValue) {
                    case "events":
                        history.push("/events");
                        break;
                    case "search":
                        history.push("/search");
                        break;
                    case "profile":
                        history.push("/profile");
                        break;
                }
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction value="events" icon={<EventIcon />} />
            <BottomNavigationAction value="search" icon={<SearchIcon />} />
            <BottomNavigationAction value="profile" icon={<AccountCircleIcon />} />
        </BottomNavigation>
    )
}

export default withRouter(BottomNav)