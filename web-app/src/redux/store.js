import thunk from 'redux-thunk'
import {applyMiddleware, compose, createStore} from "redux";
import {getFirebase} from "react-redux-firebase";
import rootReducer from "./rootReducer";

export default function configureStore(initialState, history) {
    const middleware = [thunk.withExtraArgument({ getFirebase })]
    const createStoreWithMiddleware = compose(
        applyMiddleware(...middleware)
    )(createStore)

    const store = createStoreWithMiddleware(rootReducer)

    return store
}