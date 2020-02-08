import React from "react";
import {useSelector} from "react-redux";
import {useFirestore} from "react-redux-firebase";

function Item({ id }) {
    const item = useSelector(
        ({ firestore: { data } }) => data.items && data.items[id]
    )

    const firestore = useFirestore()

    function toggleDone() {
        firestore.update(`items/${id}`,{ done: !item.done})
    }

    function deleteItem() {
        return firestore.delete(`items/${id}`)
    }

    return (
        <li className="Item">
            <input
                className="Item-Input"
                type="checkbox"
                checked={item.done}
                onChange={toggleDone}
            />
            {item.text || item.name}
            <button className="Item-Button" onClick={deleteItem}>
                Delete
            </button>
        </li>
    )
}

export default Item