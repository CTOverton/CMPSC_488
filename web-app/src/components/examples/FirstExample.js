import React, {Component} from 'react';
import Button from "@material-ui/core/Button";

class FirstExample extends Component {

    state = {
        clicked: 0,
        height: 100,
        width: 100,
        x: 0,
        y: 0
    }

    increment = () => {
         this.setState({
             clicked: this.state.clicked + 1,
             height: Math.random()*500,
             width: Math.random()*500,
             x: Math.random()*1000,
             y: Math.random()*1000
         }
        )
    }

    render() {
        return (
            <div>
                <Button style={{height: this.state.height, width: this.state.width, x: this.state.x, y: this.state.y}} variant="contained" color="secondary" onClick={this.increment}>B</Button>
            </div>
        );
    }
}

export default FirstExample