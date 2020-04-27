import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import Button from "@material-ui/core/Button";
import {createAttendees} from "../../../redux/actions/eventActions";
import {connect} from "react-redux";

const buttonRef = React.createRef()

class CSV extends Component {
    //EVENTID
/*    constructor(props) {
        super(props);
    }*/

    handleOnFileLoad = (data) => {
        console.log(this.props);
        this.props.dispatch(createAttendees(data, this.props.eventID));
    }

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }

    handleOpenDialog = (e) => {
        // Note that the ref is set async, so it might be null at some point
        if (buttonRef.current) {
            buttonRef.current.open(e)
        }
    }

    render() {
        return (
            <CSVReader
                ref={buttonRef}
                onFileLoad={this.handleOnFileLoad}
                onError={this.handleOnError}
                noClick
                noDrag
            >
                {({file}) => (
                        <Button
                            type="button"
                            variant="contained"
                            disableElevation={true}
                            onClick={this.handleOpenDialog}
                        >
                            Import
                        </Button>
                )}
            </CSVReader>
        )
    }
}

export default connect()(CSV)