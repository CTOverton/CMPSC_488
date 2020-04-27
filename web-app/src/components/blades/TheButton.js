import * as React from "react";
import Chip from "@material-ui/core/Chip";

class TheButton extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            button: true,
            key: this.props.key,
            label: this.props.label,
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleDelete() {
        this.props.onDelete();
    };

    handleClick() {
        console.log(this.props);
        this.setState({
            button: !this.state.button
        })
        this.props.onClick();
    }

    render() {
        if (this.props.onDelete != null){
            return (
                <div className="container">
                    <Chip key={this.state.key} label={this.state.label} color={this.state.button ? "default" : "primary"}
                          onClick={this.handleClick} onDelete={this.handleDelete}>Click Me!</Chip>
                </div>
            )
        }
        else{
            return (
                <div className="container">
                    <Chip key={this.state.key} label={this.state.label} color={this.state.button ? "default" : "primary"}
                          onClick={this.handleClick}>Click Me!</Chip>
                </div>
            )
        }
    }

}

export default TheButton
