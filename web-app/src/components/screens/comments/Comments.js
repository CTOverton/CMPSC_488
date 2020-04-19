import React from 'react'
import {isEmpty, isLoaded, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import List from "@material-ui/core/List";
import Comment from "./Comment";


const Comments = ({eventID}) => {

    useFirestoreConnect(() => [
        {collection: 'eventComments', doc: eventID},
    ]);

    const comments = useSelector(({firestore: {data}}) => data.eventComments && data.eventComments[eventID] && data.eventComments[eventID].comments);

    if (!isLoaded(comments)) {return null}
    if (isEmpty(comments)) {return 'No comments'}

    return (
        <List>
            {Object.keys(comments).map((commentID) =>
                <Comment key={commentID} id={commentID}/>
            )}
        </List>
    );
};

export default Comments