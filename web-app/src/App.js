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
import BottomNav from "./components/nav/BottomNav";
import BottomNavigation from "@material-ui/core/BottomNavigation";

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { blue } from '@material-ui/core/colors';

firebase.initializeApp(firebaseConfig)
firebase.firestore()

const initialState ={}
const store = configureStore(initialState)
/*
const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({
        thunk: {
            extraArgument: {getFirebase, getFirestore}
        }
    })],
})
*/

const theme = createMuiTheme({
    palette: {
        secondary: {
            main: blue[500],
        },
    },
});

function App() {
    return (
        <Provider store={store}>
            <ReactReduxFirebaseProvider
                firebase={firebase}
                config={rrfConfig}
                dispatch={store.dispatch}
                createFirestoreInstance={createFirestoreInstance}>
                <BrowserRouter>
                    <ThemeProvider theme={theme}>
                        <div className="App">
                            {/*<AppBarHeader />*/}
                            <Routes />
                            <BottomNavigation />
                            <BottomNav />
                        </div>
                    </ThemeProvider>
                </BrowserRouter>
            </ReactReduxFirebaseProvider>
        </Provider>
    );
}

export default App;
