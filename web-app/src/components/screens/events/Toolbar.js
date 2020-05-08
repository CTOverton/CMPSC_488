import React from "react";
import {addMembers, deleteMembers, tagMembers, unTagMembers} from "../../../redux/actions/memberActions";
import Grid from "@material-ui/core/Grid";
import ToolTip from "@material-ui/core/Tooltip";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Divider from "@material-ui/core/Divider";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import TextField from "@material-ui/core/TextField";
import Chip from "@material-ui/core/Chip";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CropFreeIcon from "@material-ui/icons/CropFree";
import DeleteIcon from "@material-ui/icons/Delete";
import LabelIcon from "@material-ui/icons/Label";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import {connect} from "react-redux";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {fade} from "@material-ui/core";
import {addTags} from "../../../redux/actions/eventActions";

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

const Toolbar = ({history, eventID, list, tags, selected, setSelected, selectAll, onSelectAll, addMembers, removeMembers, tagMembers, unTagMembers, members, addTags}) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [tagDialogOpen, setTagDialogOpen] = React.useState(false);
    const [AddMenu_anchorEl, AddMenu_setAnchorEl] = React.useState(null);
    const [TagMenu_anchorEl, TagMenu_setAnchorEl] = React.useState(null);
    const [memberTags, setMemberTags] = React.useState([]);
    const [memberInfo, setMemberInfo] = React.useState({
        email: '',
        displayName: ''
    });

    const [tagInfo, setTagInfo] = React.useState({
        tag: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDialogClickOpen = () => {
        setTagDialogOpen(true);
    };

    const handleTagDialogClose = () => {
        setTagDialogOpen(false);
    };

    const AddMenu_handleClick = (event) => {
        AddMenu_setAnchorEl(event.currentTarget);
    };

    const AddMenu_handleClose = () => {
        AddMenu_setAnchorEl(null);
    };

    const TagMenu_handleClick = (event) => {
        TagMenu_setAnchorEl(event.currentTarget);
    };

    const TagMenu_handleClose = () => {
        TagMenu_setAnchorEl(null);
    };

    const handleAddMemberChange = prop => event => {
        const value = event.target.value;
        if (value !== '') setMemberInfo({...memberInfo, [prop]: value})
    };

    const handleAddTagChange = prop => event => {
        const value = event.target.value;
        if (value !== '') setTagInfo({...tagInfo, [prop]: value})
    };

    const handleAddTag = () => {
        addTags(eventID, [tagInfo.tag])
    };

    const handleAddMember = () => {
        const member = {
            ...memberInfo,
            tags: memberTags
        };
        addMembers(eventID, list.id, [member]);
        setMemberInfo({
            email: '',
            displayName: ''
        });
        setMemberTags([]);
    };

    const handleRemoveMember = () => {
        removeMembers(eventID, list.id, selected);
        setSelected([]);
    };

    const handleTagMember = (tag) => {
        // Todo: multiple tags
        selected.map(memberID => {
            members.map(member => {
                if(member.id === memberID) {
                    if (member.tags.includes(tag)) {
                        console.log("untagging: ", member.displayName)
                        unTagMembers(eventID, list.id, selected, [tag]);
                    } else {
                        console.log("Tagging: ", member.displayName)
                        tagMembers(eventID, list.id, selected, [tag]);
                    }
                }
            })
        })
    }

    return (
        <Grid container alignItems="center" className={classes.root}>
            <ToolTip title={"Select All"}>
                <Checkbox
                    // Todo Select all
                    // indeterminate={selectAll === 1 ? true : undefined}
                    checked={selectAll !== 0}
                    onChange={onSelectAll}
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
                <MenuItem onClick={() => {history.push(`/event/${eventID}/list/${list.id}/import`)}}>Import List</MenuItem>
            </Menu>

            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Subscribe to {list.name}</DialogTitle>
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
                <IconButton aria-label="Scan QR Code" onClick={() => {history.push(`/event/${eventID}/list/${list.id}/scan`)}}>
                    <CropFreeIcon/>
                </IconButton>
            </ToolTip>
            <ToolTip title={"Remove"}>
                <IconButton aria-label="Remove" onClick={handleRemoveMember}>
                    <DeleteIcon />
                </IconButton>
            </ToolTip>
            <Divider orientation="vertical" flexItem/>
            <ToolTip title={"Tag"}>
                <IconButton aria-label="Tag" onClick={TagMenu_handleClick}>
                    <LabelIcon/>
                </IconButton>
            </ToolTip>

            <Menu
                id="tag-menu"
                anchorEl={TagMenu_anchorEl}
                keepMounted
                open={Boolean(TagMenu_anchorEl)}
                onClose={TagMenu_handleClose}
            >
                {tags && tags.map((tag, index) =>
                    <MenuItem key={index} onClick={() => handleTagMember(tag)}>{tag}</MenuItem>
                )}
                <Divider />
                <MenuItem onClick={() => {
                    handleDialogClickOpen();
                    TagMenu_handleClose();
                }}>Create new</MenuItem>
                <MenuItem>Manage Tags</MenuItem>
            </Menu>

            <Dialog open={tagDialogOpen} onClose={handleTagDialogClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Create new tag</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="tag-input"
                        label="Add new tag"
                        fullWidth
                        required
                        value={tagInfo.tag}
                        onChange={handleAddTagChange('tag')}
                    />
                    <div className={classes.chips}>
                        {tags.map((tag, index) =>
                            <Chip
                                key={index}
                                label={tag}
                                index={index}
                                className={classes.chip}
                            />
                        )}
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleTagDialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleAddTag} color="primary">
                        Create Tag
                    </Button>
                </DialogActions>
            </Dialog>

            <ToolTip title={"List"}>
                <IconButton aria-label="List">
                    <FormatListBulletedIcon/>
                </IconButton>
            </ToolTip>
        </Grid>
    )
}

const mapDispatch = {
    addMembers: addMembers,
    removeMembers: deleteMembers,
    tagMembers: tagMembers,
    unTagMembers: unTagMembers,
    addTags: addTags
};

export default connect(undefined, mapDispatch)(Toolbar)