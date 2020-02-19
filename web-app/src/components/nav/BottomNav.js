import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import EventIcon from '@material-ui/icons/Event';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

const useStyles = makeStyles({
    root: {
        width: "100%",
        position: 'fixed',
        bottom: 0
    },
});

const BottomNav = () => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    return(
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction value="search" icon={<SearchIcon />} />
            <Link to={'/events'} style={{ textDecoration: 'none' }}><BottomNavigationAction value="events" icon={<EventIcon />} /></Link>
            <BottomNavigationAction  value="profile" icon={<AccountCircleIcon />} />
        </BottomNavigation>
    )
}

export default BottomNav