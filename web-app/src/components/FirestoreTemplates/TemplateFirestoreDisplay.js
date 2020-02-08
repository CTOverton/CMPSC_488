import React from "react";
import {isLoaded, isEmpty, useFirestoreConnect} from "react-redux-firebase";
import {useSelector} from "react-redux";
import Item from "./TemplateFirestoreItem";


function TemplateFirestoreDisplay() {
    useFirestoreConnect(() => [{
        collection: 'items',
        limitTo: 10
    }])

    // Get items from redux state
    const items = useSelector(({ firestore: { ordered } }) => ordered.items)

    // Show a message while items are loading
    if (!isLoaded(items)) {
        return 'Loading'
    }

    // Show a message if there are no items
    if (isEmpty(items)) {
        return 'Item list is empty'
    }

    return items.map(({ id, ...todo }, ind) => (
        <Item key={`${id}-${ind}`} id={id} {...todo} />
    ))
}

export default TemplateFirestoreDisplay