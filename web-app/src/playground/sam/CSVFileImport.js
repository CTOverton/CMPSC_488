import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import {Button, Table, TableHead} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import {createAttendees} from "../../redux/actions/eventActions";

class CSVFileImport extends Component {

    state = {
        data: []
    };

    constructor(props) {
        super(props);
        this.fileInput = React.createRef()
    }

    handleReadCSV = (data) => {
        //TODO: Do something with the data
        this.setState({data: data.data});
        //this.props.event
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
                <h2>{this.state.data}</h2>
                <Divider/>
                <CSVReader
                    onFileLoaded={this.handleReadCSV}
                    inputRef={this.fileInput}
                    style={{display: 'none'}}
                    onError={this.handleOnError}
                />
                <Button variant="contained" color = "primary" onClick={this.handleImportOffer}>Import</Button>
                <Button variant="contained" color = "primary" onClick={createAttendees(
                [{email: "robocop72@hotmail.com", firstName: "Danny", lastName: "IDK How Spell Name Lol", isUser: false}],
                    "epTpn3CZ9bwbDDLmLBv3")}>Click Me!</Button>
            </>
        )
    }
}

export default CSVFileImport