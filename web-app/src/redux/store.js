import thunk from 'redux-thunk'
import {applyMiddleware, compose, createStore} from "redux";
import {getFirebase} from "react-redux-firebase";
import rootReducer from "./rootReducer";
import {getFirestore, reduxFirestore} from "redux-firestore";
import firebase from 'firebase/app'

export default function configureStore(initialState, history) {
    const middleware = [thunk.withExtraArgument({getFirebase, getFirestore})]
    const createStoreWithMiddleware = compose(
        applyMiddleware(...middleware),
        reduxFirestore(firebase)
    )(createStore)

    const store = createStoreWithMiddleware(rootReducer)

    return store
}