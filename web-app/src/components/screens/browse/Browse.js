import React, {useEffect} from 'react'
import IconButton from "@material-ui/core/IconButton";
import AddBoxIcon from "@material-ui/icons/AddBox";
import AppBarHeader from "../../nav/AppBarHeader";
import defaultImg from "../../../assets/Default Image.png";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Shelf from "./Shelf";
import {storage} from "firebase";

const useStyles = makeStyles(theme => ({
    image: {
        margin: 20,
        width: 200,
        height: 200,
        objectFit: 'cover'
    },
    container: {
        width: "100%",
    },
    featured: {
        height: 200,
        width: '100%',
        objectFit: 'cover'
    }
}));

const Browse = ({history}) => {
    const classes = useStyles();

    const [eventImg, setEventImg] = React.useState(null);
    const [hasFetched, setHasFetched] = React.useState(false);

    useEffect(() => {
        if (eventImg === null && hasFetched === false) {
            let img = storage().ref(`eventImages/${"CKIE9Xgusn1Y4hONvih0"}`);

            img
                .getDownloadURL()
                .then(url => {
                    setHasFetched(true);
                    setEventImg(url);
                })
                .catch(error => {
                    setHasFetched(true);
                    switch (error.code) {
                        case 'storage/object-not-found':
                            // File doesn't exist
                            break;
                        case 'storage/unauthorized':
                            // User doesn't have permission to access the object
                            break;
                        case 'storage/canceled':
                            // User canceled the upload
                            break;
                        case 'storage/unknown':
                            // Unknown error occurred, inspect the server response
                            break;
                        default:
                            break;
                    }
                });
        }
    });

    return (
        <div>
            <AppBarHeader
                title="Search"
            />

            <img className={classes.featured} src={eventImg ? eventImg : defaultImg} alt=""/>

            <Shelf history={history} title={"Trending"} events={[
                {id: "3eKfQGfdcw3oTiV8UnQU", title: "Cruise", createdAt: "05/08/20"},
                {id: "eDp5cfKp5rd47mwgKTgs", title: "Pizza Party", createdAt: "05/08/20"},
                {id: "X0hQlHbXgYzcitQyd05D", title: "Cameron's 18th", createdAt: "05/08/20"},
            ]}/>
            <Shelf history={history} title={"Your interests"} events={[
                {id: "8rzuCEjhInUdYVFXMPjT", title: "SNO Club Trip", createdAt: "05/08/20"},
                {id: "CKIE9Xgusn1Y4hONvih0", title: "X-Games", createdAt: "05/08/20"},
                {id: "YdM0w2aTjXo8R3FJmb6M", title: "Big Air", createdAt: "05/08/20"},
            ]}/>
        </div>
    );
};

export default Browse