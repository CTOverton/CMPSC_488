const EventsDetailPage = ({match}) => {
    const eventID = match.params.eventID;

    useFirestoreConnect(() => [
        {collection: 'events', doc: eventID},
    ]);

    const event = useSelector(({firestore: {data}}) => data.events && data.events[eventID]);

    if (!isLoaded(event)) {return null}

    return (
        <Comments eventID={eventID}/>
    );
};

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

const Comment = ({id}) => {

    useFirestoreConnect(() => [
        {collection: 'comments', doc: id},
    ]);

    const comment = useSelector(({firestore: {data}}) => data.comments && data.comments[id]);

    if (!isLoaded(comment)) {return null}

    return (
        <ListItem>
            <ListItemText primary={comment.content} secondary={moment(comment.createdAt.toDate()).calendar()} />
        </ListItem>
    );
};

const firestore = {
    events: {
        eventID: { // Doc
            description: "Event Description", // Field
            title: "Event Title", // Field
        }
    },

    eventComments: { // Collection
        eventID: { // Doc
            comments: { // Field
                commentID1: true, // Value
                commentID2: true, // Value
                commentID3: true, // Value
            }
        }
    },

    comments: { // Collection
        commentID1: { // Doc
            createdAt: "Timestamp", // Field
            createdBy: "uid", // Field
            content: "Comment Body" // Field
        },
        commentID2: {...},
        commentID3: {...},
    },
};
