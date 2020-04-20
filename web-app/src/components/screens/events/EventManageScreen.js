import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AppBarHeader from "../../nav/AppBarHeader";
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
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Chip from "@material-ui/core/Chip";

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
        margin: '14px auto',
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.black, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.black, 0.25),
        },
        width: '300px',
    },
    searchIcon: {
        position: 'absolute',
        left: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        pointerEvents: 'none',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        margin: theme.spacing(1, 5),
        width: '100%',
    },
    searchDrop: {
        position: 'absolute',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)'
    },


    chips: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing(0.5),
    },
    chip: {
        margin: theme.spacing(0.5),
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
    const {tags} = event;

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
            {/* Search */}
            <div className={classes.search}>
                <IconButton className={classes.searchIcon}>
                    <SearchIcon />
                </IconButton>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton className={classes.searchDrop}>
                    <ArrowDropDownIcon />
                </IconButton>
            </div>

            {/* Tags */}
            <div className={classes.chips}>
                {tags.map((tag, index) =>
                    <Chip
                        key={index}
                        label={tag}
                        index={index}
                        // onDelete={() => handleDelete(tag.key)}
                        className={classes.chip}
                    />
                )}
            </div>

            {/* Toolbar */}
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

            {/* List Tabs */}
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

            {/* List of members */}
            <MembersList eventID={eventID} listID={lists[0].id}/>
        </div>
    );
};

export default EventManageScreen