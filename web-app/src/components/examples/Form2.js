import React, {Component} from "react";
import {Input} from "@material-ui/core";

class Form2 extends Component {

    state = {
        data: '',
    };

    onInputChange(e) {
        function changeInput(param) {
            return param;
        }

        return changeInput(e && e.target && e.target.value)
    }

    render(){
        return (
            <div>
                <div><Input value={this.data} disabled={true}></Input></div>
            <div><Input onChange={this.onInputChange()}></Input></div>
            </div>
        )
    }
}

export default Form2