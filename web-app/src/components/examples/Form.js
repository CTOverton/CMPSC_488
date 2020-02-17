import React, {Component} from "react";

class Form extends Component {

    state = {
        users: [{name: 'YEETS!', age: 563}],
        name: null,
        age: null
    };

    handleChange = (e) => {
        this.setState({
            [e.target.id]: e.target.value
        })
    };
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.users);
        this.state.users.push({name: this.state.name, age: this.state.age});
    };

    render(){
        return(
            <div>
                <div>
                </div>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="name">Name: </label>
                    <input type="text" id="name" onChange={this.handleChange}/>
                    <label htmlFor="age">Age: </label>
                    <input type="text" id="age" onChange={this.handleChange}/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default Form