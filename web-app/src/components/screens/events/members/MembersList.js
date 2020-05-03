import React from 'react'
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Chip from "@material-ui/core/Chip";
import makeStyles from "@material-ui/core/styles/makeStyles";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import defaultIMG from "../../../../assets/Default Image.png"
import {scryRenderedComponentsWithType} from "react-dom/test-utils";

const useStyles = makeStyles(theme => ({
    item: {
        display: 'block'
    },
    chips: {
        display: 'flex',
        paddingLeft: 66,
        // justifyContent: 'center',
        // flexWrap: 'wrap',
        overflow: 'auto',
        whiteSpace: 'nowrap',
        '& > *': {
            margin: theme.spacing(0.5),
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

const MembersList = ({eventID, listID, filter, tagFilter, toggleSelectAll}) => {
    const [selected, setSelected] = React.useState([]);
    const [selectAll, setSelectAll] = React.useState(0);

    useFirestoreConnect(() => [
        {collection: 'events', doc: eventID, subcollections: [{collection: 'lists', doc: listID, subcollections: [{collection: 'members'}]}], storeAs: "members"}
    ]);

    const members = useSelector(({firestore: {ordered}}) => ordered.members);

    if (!isLoaded(members)) {return null}

    const handleSelected = id => {
        if (selected.includes(id)) {
            setSelected(selected.filter(member => member !== id));
        } else {
            setSelected([...selected, id]);
        }
    }

    const updateSelectedStatus = () => {
        // Nothing
        if (selected.length === 0) {
            setSelectAll(0);
        }
        // More than one
        if (selected.length > 0 && selected.length !== members.length) {
            setSelectAll(1);
        }
        // Everything
        if (selected.length === members.length) {
            setSelectAll(2);
        }
    }

    const handleSelectAll = () => {
        switch(selectAll) {
            case 0:
                setSelected(members.filter(member => member.id));
                break;
            case 1:
                setSelected([]);
                break;
            case 2:
                setSelected([]);
                break;
        }
    }

    return (
        <List>
            {members.map(member => {
                const item = <MembersListItem key={member.id} member={member} selected={selected.includes(member.id)} onChecked={() => handleSelected(member.id)}/>
                if (filter === '' && tagFilter.length === 0) return item;

                if (filter === '' && tagFilter.length > 0) {
                    if (tagFilter.every(tag => member.tags.includes(tag))) return item;
                }

                const searchText = (member.displayName + member.email).toUpperCase().replace(/\s/g, '');
                const filterText = filter.toUpperCase().replace(/\s/g, '');

                if (filter !== '' && tagFilter.length === 0) {
                    if (searchText.includes(filterText)) return item;
                }

                if (searchText.includes(filterText) && tagFilter.every(tag => member.tags.includes(tag))) return item;
                return null;
            })}
        </List>
    );
};

const MembersListItem = ({member, selected, onChecked}) => {
    const classes = useStyles();
    const {displayName, email, tags} = member;

    return (
        <div>
            <ListItem button>
                <ListItemAvatar>
                    <Avatar
                        alt={'avatar'}
                        src={defaultIMG}
                    />
                </ListItemAvatar>
                <ListItemText primary={displayName} secondary={email}/>
                <ListItemSecondaryAction>
                    <Checkbox
                        edge="end"
                        onChange={onChecked}
                        checked={selected}
                        // inputProps={{ 'aria-labelledby': labelId }}
                    />
                </ListItemSecondaryAction>
            </ListItem>
            <div className={classes.chips}>
                {tags && tags.map((tag) =>
                    <Chip key={tag} label={tag}/>
                )}
            </div>
        </div>

    )
};

export default MembersList