import React from 'react'
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AppBarHeader from "../../nav/AppBarHeader";
import SettingsIcon from '@material-ui/icons/Settings';
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {connect, useSelector} from "react-redux";
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
import CropFreeIcon from '@material-ui/icons/CropFree';
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {addMembers} from "../../../redux/actions/memberActions";
import ToolTip from "@material-ui/core/ToolTip";

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

const EventManageScreen = ({history, match, addMembers}) => {
    const classes = useStyles();
    const eventID = match.params.eventID;
    const [tab, setTab] = React.useState(0);
    const [AddMenu_anchorEl, AddMenu_setAnchorEl] = React.useState(null);
    const [search, setSearch] = React.useState('');
    const [tagFilter, setTagFilter] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [memberTags, setMemberTags] = React.useState([]);
    const [memberInfo, setMemberInfo] = React.useState({
        email: '',
        displayName: ''
    });
    const [selectAll, setSelectAll] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useFirestoreConnect(() => [
        {collection: 'events', doc: eventID},
        {collection: 'events', doc: eventID, subcollections: [{collection: 'lists'}], storeAs: "lists"},
    ]);

    // console.log(useSelector(state => state))
    const event = useSelector(({firestore: {data}}) => data.events && data.events[eventID]);
    const lists = useSelector(({firestore: {ordered}}) => ordered.lists);
    if (!isLoaded(event) || !isLoaded(lists)) {
        return null
    }

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

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleAddMemberChange = prop => event => {
        const value = event.target.value;
        if (value !== '') setMemberInfo({...memberInfo, [prop]: value})
    };

    const handleAddMember = () => {
        const member = {
            ...memberInfo,
            tags: memberTags
        };
        addMembers(eventID, lists[tab].id, [member]);
        setMemberInfo({
            email: '',
            displayName: ''
        });
        setMemberTags([]);
    };

    return (
        <div>
            {/* region Header*/}
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
                        <ArrowBackIosIcon/>
                    </IconButton>
                }
                title="Manage Event"
                end={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            history.push(`/event/${eventID}/settings`);
                        }}
                        color="inherit"
                        aria-label="settings"
                    >
                        <SettingsIcon/>
                    </IconButton>
                }
            />
            {/* endregion */}

            {/* Search */}
            <div className={classes.search}>
                <IconButton className={classes.searchIcon}>
                    <SearchIcon/>
                </IconButton>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput,
                    }}
                    inputProps={{'aria-label': 'search'}}
                    onChange={handleSearch}
                />
                <IconButton className={classes.searchDrop}>
                    <ArrowDropDownIcon/>
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
                        color={tagFilter.includes(tag) ? "primary" : "default"}
                        onClick={() => {
                            if (tagFilter.includes(tag)) {
                                setTagFilter(tagFilter.filter(oldTag => oldTag !== tag))
                            } else {
                                setTagFilter([...tagFilter, tag])
                            }
                        }}
                    />
                )}
            </div>

            {/* Toolbar */}
            <Grid container alignItems="center" className={classes.root}>
                <ToolTip title={"Select All"}>
                    <Checkbox
                        checked={selectAll}
                        onChange={() => setSelectAll(!selectAll)}
                    />
                </ToolTip>
                <ToolTip title="Fix Me">
                    <IconButton className={classes.arrowDropDown}>
                        <ArrowDropDownIcon/>
                    </IconButton>
                </ToolTip>
                <Divider orientation="vertical" flexItem/>
                <ToolTip title={"Add"}>
                    <IconButton aria-controls="add-menu" aria-haspopup="true" aria-label="Add"
                                onClick={AddMenu_handleClick}>
                        <PersonAddIcon/>
                    </IconButton>
                </ToolTip>
                <Menu
                    id="add-menu"
                    anchorEl={AddMenu_anchorEl}
                    keepMounted
                    open={Boolean(AddMenu_anchorEl)}
                    onClose={AddMenu_handleClose}
                >
                    <MenuItem onClick={() => {
                        handleClickOpen();
                        AddMenu_handleClose();
                    }}>Add Member</MenuItem>
                    <MenuItem onClick={AddMenu_handleClose}>Import List</MenuItem>
                </Menu>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Subscribe to {lists[tab].name}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter member info and select tags to subscribe them to this list.
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="email"
                            label="Email Address"
                            type="email"
                            fullWidth
                            required
                            value={memberInfo.email}
                            onChange={handleAddMemberChange('email')}
                        />
                        <TextField
                            margin="dense"
                            id="displayName"
                            label="Full Name"
                            type="name"
                            fullWidth
                            value={memberInfo.displayName}
                            onChange={handleAddMemberChange('displayName')}
                        />
                        <div className={classes.chips}>
                            {tags.map((tag, index) =>
                                <Chip
                                    key={index}
                                    label={tag}
                                    index={index}
                                    className={classes.chip}
                                    color={memberTags.includes(tag) ? "primary" : "default"}
                                    onClick={() => {
                                        if (memberTags.includes(tag)) {
                                            setMemberTags(memberTags.filter(oldTag => oldTag !== tag))
                                        } else {
                                            setMemberTags([...memberTags, tag])
                                        }
                                    }}
                                />
                            )}
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleAddMember} color="primary">
                            Add Member
                        </Button>
                    </DialogActions>
                </Dialog>
                <ToolTip title={"Scan QR"}>
                    <IconButton aria-label="Scan QR Code">
                        <CropFreeIcon/>
                    </IconButton>
                </ToolTip>
                <ToolTip title={"Remove"}>
                    <IconButton aria-label="Remove">
                        <DeleteIcon/>
                    </IconButton>
                </ToolTip>
                <Divider orientation="vertical" flexItem/>
                <ToolTip title={"Tag"}>
                    <IconButton aria-label="Tag">
                        <LabelIcon/>
                    </IconButton>
                </ToolTip>
                <ToolTip title={"List"}>
                    <IconButton aria-label="List">
                        <FormatListBulletedIcon/>
                    </IconButton>
                </ToolTip>
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
                        return <Tab key={list.id} label={list.name}/>
                    })}
                </Tabs>
            </Paper>

            {/* List of members */}
            <MembersList eventID={eventID} listID={lists[tab].id} filter={search} tagFilter={tagFilter} toggleSelectAll={selectAll}/>
        </div>
    );
};

const mapDispatch = {addMembers: addMembers};

export default connect(undefined, mapDispatch)(EventManageScreen)