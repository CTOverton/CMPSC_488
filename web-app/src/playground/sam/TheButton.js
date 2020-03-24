import * as React from "react";
import Chip from "@material-ui/core/Chip";

class TheButton extends React.Component {
    constructor(props){
        super(props)
        this.state ={
            button: true,
            key: this.props.key,
            label: this.props.label
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(){
        this.setState({
            button:!this.state.button
        })
        this.props.onClick();
    }
    render(){
        return (
            <div className="container">
                <Chip key = {this.state.key} label = {this.state.label} color ={this.state.button ? "default": "primary"} onClick={this.handleClick}>Click Me!</Chip>
            </div>
        )
    }

}

export default TheButton
