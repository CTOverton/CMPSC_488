import React, {useState} from "react";
import {useFirestore} from "react-redux-firebase";

function TemplateFirestoreAddItem() {
    const [inputVal, changeInput] = useState('')
    const firestore = useFirestore()

    function resetInput() {
        changeInput('')
    }

    function onInputChange(e) {
        return changeInput(e && e.target && e.target.value)
    }

    function addItem() {
        return firestore
            .collection('items')
            .add({ text: inputVal || 'sample', done:false})
    }

    return (
        <div style={{ marginBottom: '2rem' }}>
            <h4>New Item</h4>
            <input value={inputVal} onChange={onInputChange} />
            <button onClick={addItem}>Add</button>
            <button onClick={resetInput}>Cancel</button>
        </div>
    )
}

export default TemplateFirestoreAddItem