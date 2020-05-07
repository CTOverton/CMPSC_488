import React, {useEffect} from 'react'
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
import FormControlLabel from "@material-ui/core/FormControlLabel";

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

const MembersList = ({eventID, listID, filter, tagFilter, onSelect, selected}) => {
    useFirestoreConnect(() => [
        {collection: 'events', doc: eventID, subcollections: [{collection: 'lists', doc: listID, subcollections: [{collection: 'members'}]}], storeAs: "members"}
    ]);

    const members = useSelector(({firestore: {ordered}}) => ordered.members);

    if (!isLoaded(members)) {return null}

    return (
        <List>
            {members.map(member => {
                const item = <MembersListItem key={member.id} member={member} selected={selected.includes(member.id)} onChecked={() => onSelect(member.id)}/>
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
                    <Checkbox edge="end" onChange={onChecked} checked={selected} />
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