import React from 'react'
import {isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import ListItemText from "@material-ui/core/ListItemText";
import moment from "moment";
import ListItem from "@material-ui/core/ListItem";


const Comment = ({id}) => {

    useFirestoreConnect(() => [
        {collection: 'comments', doc: id},
    ]);

    const comment = useSelector(({firestore: {data}}) => data.comments && data.comments[id]);

    if (!isLoaded(comment)) {return null}

    console.log(comment.createdBy)

    // Todo: get user info like username
    /*useFirestoreConnect(() => [
        {collection: 'users', doc: comment.createdBy},
    ]);

    const user = useSelector(({firestore: {data}}) => data.users && data.users[comment.createdBy]);*/

    return (
        <ListItem>
            <ListItemText primary={comment.content} secondary={moment(comment.createdAt.toDate()).calendar()} />
        </ListItem>
    );
};

export default Comment