import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {authReducer} from "./reducers/authReducer";
import {eventReducer} from "./reducers/eventReducer";
import {userReducer} from "./reducers/userReducer";

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    events: eventReducer,
    user: userReducer
});

export default rootReducer