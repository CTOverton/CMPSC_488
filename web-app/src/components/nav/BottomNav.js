import React from "react";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import EventIcon from '@material-ui/icons/Event';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import makeStyles from "@material-ui/core/styles/makeStyles";

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
            <BottomNavigationAction value="events" icon={<EventIcon />} />
            <BottomNavigationAction  value="profile" icon={<AccountCircleIcon />} />
        </BottomNavigation>
    )
}

export default BottomNav