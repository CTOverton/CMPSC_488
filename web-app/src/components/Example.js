import React, { Component } from 'react'
import QrReader from 'react-qr-scanner'

class Example extends Component {
    constructor(props){
        super(props)
        this.state = {
            delay: 500,
            result: 'No result',
        }

        this.handleScan = this.handleScan.bind(this)
    }
    handleScan(result){
        if(result){
            this.setState({ result })
        }
    }
    handleError(err){
        console.error(err)
    }

    idk(data){
        console.log(data)
    }

    render(){
        const previewStyle = {
            height: 240,
            width: 320,
        }

        return(
            <div>
                <QrReader
                    delay={this.state.delay}
                    style={previewStyle}
                    onError={this.handleError}
                    onScan={this.handleScan}
                    facingMode={"rear"}
                    // legacyMode={true}
                    // onImageLoad={this.idk}
                />
                <p>{this.state.result}</p>
            </div>
        )
    }
}

export default Example