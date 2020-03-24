import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import {Redirect, withRouter} from "react-router-dom";

class TestQR extends Component {
    state = {
        result: 'No result'
    }

    handleScan = result => {
        if (result) {
            this.setState({
                result: result
            })

            let data = JSON.parse(result)

            this.props.history.push("/events/" + data.eventID + "/attendee/" + data.attendeeID)
        }
    }
    handleError = err => {
        console.error(err)
    }
    render() {
        return (
            <div>
                <QrReader
                    delay={300}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    style={{ width: '100%' }}
                />
                <p>{this.state.result}</p>
            </div>
        )
    }
}

export default withRouter(TestQR)