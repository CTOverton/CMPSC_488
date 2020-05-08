import React, { Component } from 'react'
import QrReader from 'react-qr-reader'
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AppBarHeader from "./nav/AppBarHeader";

const TestQR = ({history, match}) => {
    const [result, setResult] = React.useState(null);

    const handleScan = result => {
        if (result) {
            setResult(JSON.parse(result))
        }
    }
    const handleError = err => {
        console.error(err)
    }

    return (
        <div>
            <AppBarHeader
                start={
                    <IconButton
                        edge="end"
                        onClick={() => {
                            history.goBack()
                        }}
                        color="inherit"
                        aria-label="back"
                    >
                        <ArrowBackIosIcon />
                    </IconButton>
                }
                title="Scan QR Code"
            />
            <QrReader
                delay={300}
                onError={handleError}
                onScan={handleScan}
                style={{ width: '100%' }}
            />
            <p>{result && result.uid}</p>
        </div>
    )
}

export default TestQR