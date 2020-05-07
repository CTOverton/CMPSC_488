import React, { Component } from 'react'
import { CSVReader } from 'react-papaparse'
import Button from "@material-ui/core/Button";

class CSVFileImport extends Component {

    constructor(props) {
        super(props);
        this.buttonRef = React.createRef();
    }

    handleOnFileLoad = (data) => {
        this.props.onFileLoad(data);
    }

    handleOnError = (err, file, inputElem, reason) => {
        console.log(err)
    }

    handleOpenDialog = (e) => {
        this.buttonRef.current.open(e)
    }

    render() {
        return (
            <div>
                <CSVReader
                    ref={this.buttonRef}
                    onFileLoad={this.handleOnFileLoad}
                    onError={this.handleOnError}
                    config={this.props.parseOptions}
                    noClick
                    noDrag
                >
                    {() => (
                        <Button
                            type="button"
                            variant="contained"
                            disableElevation
                            onClick={this.handleOpenDialog}
                            color="primary"
                        >
                            Upload CSV
                        </Button>
                    )}
                </CSVReader>
            </div>
        )
    }
}

export default CSVFileImport