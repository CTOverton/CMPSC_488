import React from 'react';
import './App.css';
import configureStore from "./redux/store";
import firebaseConfig from "./config/fbConfig";
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/firestore' // make sure you add this for firestore
import {Provider} from "react-redux";
import {ReactReduxFirebaseProvider} from "react-redux-firebase";
import {createFirestoreInstance} from "redux-firestore";
import rrfConfig from "./config/rrfConfig";

import {BrowserRouter} from "react-router-dom";
import Routes from "./components/nav/Routes";

const initialState ={}
const store = configureStore(initialState)

firebase.initializeApp(firebaseConfig)

function App() {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider
                firebase={firebase}
                config={rrfConfig}
                dispatch={store.dispatch}
                createFirestoreInstance={createFirestoreInstance}>
                <BrowserRouter>
                    <div className="App">
                        {/*<Nav />*/}
                        <Routes />
                    </div>
                </BrowserRouter>
            </ReactReduxFirebaseProvider>
        </Provider>
    );
}

export default App;
