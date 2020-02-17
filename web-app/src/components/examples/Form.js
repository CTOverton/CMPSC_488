import React, {Component, useState} from "react";
import Button from "@material-ui/core/Button";
import {FormGroup} from "@material-ui/core";
import Input from "@material-ui/core/Input";

function Form(){

    const [inputval, changeInput] = useState('')

    function add() {
        this.setState({value: this.state.value + inputval})
        console.log(inputval);
    }

    function onInputChange(e) {
        return changeInput(e && e.target && e.target.value)
    }

    return (<container>
        <form onSubmit={add}>
            <Input value = {inputval} onChange={onInputChange}/>
            <Button type="submit"/>
        </form>
        </container>
    )
}

export default Form