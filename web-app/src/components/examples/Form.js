import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import Input from "@material-ui/core/Input";
import {FormGroup} from "@material-ui/core";

function Form(){

    const [inputval, changeInput] = useState('')

    function add() {
        this.setState({value: this.state.value + inputval})
        console.log(inputval);
    }

    function onInputChange(e) {
        return changeInput(e && e.target && e.target.value)
    }

    return (<div>
        <FormGroup onSubmit={add}>
            <Input value = {inputval} onChange={onInputChange}/>
            <Button variant="contained" color = "primary" onClick={add}>CLICK ME</Button>
        </FormGroup>
        </div>
    )
}

export default Form