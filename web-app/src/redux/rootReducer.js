import {combineReducers} from "redux";
import {firebaseReducer} from "react-redux-firebase";
import {firestoreReducer} from "redux-firestore";
import {authReducer} from "./reducers/authReducer";
import {eventReducer} from "./reducers/eventReducer";
import {userReducer} from "./reducers/userReducer";
import {memberReducer} from "./reducers/memberReducer";

const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer,
    auth: authReducer,
    events: eventReducer,
    user: userReducer,
    members: memberReducer
});

export default rootReducer