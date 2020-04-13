import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const AppBarHeader = ({start, title, end}) => {
    const classes = useStyles();

    const centeredValue = false;

    return(
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    {start}
                    {centeredValue === true ?
                        <Typography variant="h6" className={classes.title}>{title}</Typography>:
                        <Typography variant="h6" className={classes.title} align={"left"}>{title}</Typography>}
                    {end}
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default AppBarHeader