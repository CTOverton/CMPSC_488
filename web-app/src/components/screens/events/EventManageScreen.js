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
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import makeStyles from "@material-ui/core/styles/makeStyles";
import SearchIcon from '@material-ui/icons/Search';
import InputBase from "@material-ui/core/InputBase";
import {fade} from "@material-ui/core";
import Chip from "@material-ui/core/Chip";
import {addMembers} from "../../../redux/actions/memberActions";
import Toolbar from "./Toolbar";

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
    const [search, setSearch] = React.useState('');
    const [tagFilter, setTagFilter] = React.useState([]);
    const [selected, setSelected] = React.useState([]);
    const [selectAll, setSelectAll] = React.useState(0);

    useFirestoreConnect(() => [
        {collection: 'events', doc: eventID},
        {collection: 'events', doc: eventID, subcollections: [{collection: 'lists'}], storeAs: "lists"},
    ]);

    const event = useSelector(({firestore: {data}}) => data.events && data.events[eventID]);
    const lists = useSelector(({firestore: {ordered}}) => ordered.lists);
    const members = useSelector(({firestore: {ordered}}) => ordered.members);

    if (!isLoaded(event) || !isLoaded(lists)) {
        return null
    }

    const list = lists[tab];
    const listID = list.id;

    const {tags} = event;

    const handleChange = (event, newValue) => {
        setTab(newValue);
    };

    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const handleTagSelect = (tag) => {
        if (tagFilter.includes(tag)) {
            setTagFilter(tagFilter.filter(oldTag => oldTag !== tag))
        } else {
            setTagFilter([...tagFilter, tag])
        }
    };

    const handleSelected = memberID => {
        if (selected.includes(memberID)) {
            setSelected(selected.filter(member => member !== memberID));
        } else {
            setSelected([...selected, memberID]);
        }
    }

    const handleSelectAll = () => {
        if (isLoaded(members)) {
            switch(selectAll) {
                case 0:
                    setSelected(members.map(member => member.id));
                    setSelectAll(2);
                    break;
                case 1:
                    setSelected(members.map(member => member.id));
                    setSelectAll(2);
                    break;
                case 2:
                    setSelected([]);
                    setSelectAll(0);
                    break;
            }
        }
    }

    /*
    *     useEffect(() => {
        if (isLoaded(members)) {
            let status = 0;
            if (selected.length === 0) {
                status = 0;
            }
            if (selected.length > 0) {
                status = 1;
            }
            if (selected.length === members.length) {
                status = 2;
            }

            if (selectAll !== status) {setSelectAll(status);}
        }
    })
    * */

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

            {/* region Search */}
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
            {/* endregion */}

            {/* region Tags */}
            <TagBoard tags={tags}
                      tagFilter={tagFilter}
                      onSelect={handleTagSelect} />
            {/* endregion */}

            {/* region Toolbar */}
            <Toolbar eventID={eventID} list={list} tags={tags} selected={selected} setSelected={setSelected} selectAll={selectAll} onSelectAll={handleSelectAll}/>
            {/* endregion */}

            {/* region List Tabs */}
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
            {/* endregion */}

            {/* region List of members */}
            <MembersList eventID={eventID} listID={listID} filter={search} tagFilter={tagFilter} onSelect={handleSelected} selected={selected}/>
            {/* endregion */}
        </div>
    );
};

const TagBoard = ({tags, tagFilter, onSelect}) => {
    const classes = useStyles();

    return (
        <div className={classes.chips}>
            {tags.map((tag, index) =>
                <Chip
                    key={index}
                    label={tag}
                    index={index}
                    // onDelete={() => handleDelete(tag.key)}
                    className={classes.chip}
                    color={tagFilter.includes(tag) ? "primary" : "default"}
                    onClick={() => {onSelect(tag)}}
                />
            )}
        </div>
    )
}

const mapDispatch = {addMembers: addMembers};

export default connect(undefined, mapDispatch)(EventManageScreen)