import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AppBarHeader from "../../nav/AppBarHeader";
import Container from "@material-ui/core/Container";
import MoreVertIcon from '@material-ui/icons/MoreVert';
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Paper from "@material-ui/core/Paper";
import MembersList from "./members/MembersList";
import Checkbox from "@material-ui/core/Checkbox";
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";
import DeleteIcon from '@material-ui/icons/Delete';
import Grid from "@material-ui/core/Grid";
import LabelIcon from '@material-ui/icons/Label';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: theme.spacing(0.5),
        width: 'fit-content',
        color: theme.palette.text.secondary,
        '& > *': {
            margin: theme.spacing(0),
        },
        '& hr': {
            margin: theme.spacing(1, 0.5),
        },
    },
    arrowDropDown: {
        margin: theme.spacing(0),
    },


    search: {
        margin: theme.spacing(1),
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        width: '100%',
        /*[theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },*/
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        // padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        // paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        // transition: theme.transitions.create('width'),
        width: '100%',
        /*[theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },*/
    },
}));

const EventManageScreen = ({history, match}) => {
    const classes = useStyles();
    const eventID = match.params.eventID;
    const [tab, setTab] = React.useState(0);
    const [AddMenu_anchorEl, AddMenu_setAnchorEl] = React.useState(null);

    useFirestoreConnect(() => [
        {collection: 'events', doc: eventID},
        {collection: 'events', doc: eventID, subcollections: [{collection: 'lists'}], storeAs: "lists"},
    ]);

    // console.log(useSelector(state => state))
    const event = useSelector(({firestore: {data}}) => data.events && data.events[eventID]);
    const lists = useSelector(({firestore: {ordered}}) => ordered.lists);
    if (!isLoaded(event) || !isLoaded(lists)) {return null}

    console.log(event, lists);

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const AddMenu_handleClick = (event) => {
        AddMenu_setAnchorEl(event.currentTarget);
    };

    const AddMenu_handleClose = () => {
        AddMenu_setAnchorEl(null);
    };


    return (
        <div>
            <AppBarHeader
                start={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            history.goBack()
                        }}
                        color="inherit"
                        aria-label="back"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                }
                title="Manage Event"
                end={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            console.log("Change Event settings")
                        }}
                        color="inherit"
                        aria-label="settings"
                    >
                        <MoreVertIcon />
                    </IconButton>
                }
            />

            {/* TODO: Fix this stupid search bar*/}
            {/*<div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
            </div>*/}

            <Grid container alignItems="center" className={classes.root}>
                <Checkbox />
                <IconButton className={classes.arrowDropDown}>
                    <ArrowDropDownIcon />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <IconButton aria-controls="add-menu" aria-haspopup="true" onClick={AddMenu_handleClick}>
                    <PersonAddIcon />
                </IconButton>
                <Menu
                    id="add-menu"
                    anchorEl={AddMenu_anchorEl}
                    keepMounted
                    open={Boolean(AddMenu_anchorEl)}
                    onClose={AddMenu_handleClose}
                >
                    <MenuItem onClick={AddMenu_handleClose}>Add Member</MenuItem>
                    <MenuItem onClick={AddMenu_handleClose}>Import List</MenuItem>
                </Menu>


                <IconButton>
                    <DeleteIcon />
                </IconButton>
                <Divider orientation="vertical" flexItem />
                <IconButton>
                    <LabelIcon />
                </IconButton>
                <IconButton>
                    <FormatListBulletedIcon />
                </IconButton>
            </Grid>
            <Paper square>
                <Tabs
                    value={tab}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                    aria-label="lists"
                >
                    {lists.map(list => {
                        return <Tab key={list.id} label={list.name} />
                    })}
                </Tabs>
            </Paper>
            <MembersList eventID={eventID} listID={lists[0].id}/>
        </div>
    );
};

export default EventManageScreen