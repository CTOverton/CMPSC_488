import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {authReducer} from "./reducers/authReducer";
import {eventReducer} from "./reducers/eventReducer";

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    events: eventReducer
});

export default rootReducer