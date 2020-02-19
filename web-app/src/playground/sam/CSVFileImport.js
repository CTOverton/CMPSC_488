import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import {Button} from "@material-ui/core";

class CSVFileImport extends Component {
    constructor(props) {
        super(props)
        this.fileInput = React.createRef()
    }

    handleReadCSV = (data) => {
        //TODO: Do something with the data
        console.log(data)
    }

    handleOnError = (err, file, inputElem, reason) => {
        //TODO: Return Error Message
        console.log(err)
    }

    handleImportOffer = () => {
        this.fileInput.current.click()
    }

    render() {
        return (
            <>
                <CSVReader
                    onFileLoaded={this.handleReadCSV}
                    inputRef={this.fileInput}
                    style={{display: 'none'}}
                    onError={this.handleOnError}
                />
                <Button variant="contained" color = "primary" onClick={this.handleImportOffer}>Import</Button>
            </>
        )
    }
}

export default CSVFileImport