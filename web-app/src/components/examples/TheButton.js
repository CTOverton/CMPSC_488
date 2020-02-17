import React, {Component} from "react";
import Button from "@material-ui/core/Button";

class TheButton extends Component {

    state = {
        value: 0,
    };

    incrementX = () => {
        this.setState({value: this.state.value + 1})
    };
    decrementX = () => {
        this.setState({value: this.state.value - 1})
    };

    render(){
        return <container>
            <div><Button variant="contained" color = "primary" onClick={this.incrementX}>Forwards</Button>
                <Button variant="contained" color = "primary" onClick={this.decrementX}>Backwards</Button></div>
            <div><h2>CLICKS: {this.state.value}</h2></div>
        </container>
    }
}

export default TheButton