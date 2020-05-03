import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        marginLeft: theme.spacing(2),
    },
    systembar: {
        height: 24,
        width: '100%'
    }
}));

const AppBarHeader = ({start, title, end}) => {
    const classes = useStyles();
    const centeredValue = false;
    const screenShot = false;

    return(
        <div className={classes.root}>
            <AppBar position="fixed">
                {screenShot && <div className={classes.systembar}/>}
                <Toolbar>
                    {start}
                    {centeredValue === true ?
                        <Typography variant="h6" className={classes.title}>{title}</Typography>:
                        <Typography variant="h6" className={classes.title} align={"left"}>{title}</Typography>}
                    {end}
                </Toolbar>
            </AppBar>
            {screenShot && <div className={classes.systembar}/>}
            <Toolbar />
        </div>
    )
};

export default AppBarHeader