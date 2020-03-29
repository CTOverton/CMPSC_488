import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import {Button} from "@material-ui/core";
import {createAttendees} from "../../../redux/actions/eventActions";
import {connect} from "react-redux";


class CSVFileImport extends Component {

    constructor(props) {
        super(props);
        this.fileInput = React.createRef()
    }

    handleReadCSV = (data) => {
        this.props.dispatch(createAttendees(data.data, this.props.eventID));
    };


    handleOnError = (err, file, inputElem, reason) => {
        //TODO: Return Error Message
        console.log(err)
    };

    handleImportOffer = () => {
        this.fileInput.current.click()
    };

    render() {
        return (
            <>
                <CSVReader
                    onFileLoaded={this.handleReadCSV}
                    inputRef={this.fileInput}
                    style={{display: 'none'}}
                    onError={this.handleOnError}
                />
                <Button variant="contained" disableElevation={true} onClick={this.handleImportOffer}>Import</Button>
            </>
        )
    }
}

export default connect()(CSVFileImport)