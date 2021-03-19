import React from "react";

class InputMessage extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            message: ""
        }
    };

    handleChange = (event) => {
        this.setState({message: event.target.value});
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({message: ""});
        this.props.handleSendMessage(this.state.message);
    }

    render(){
        return(
            <form onSubmit={event => this.handleSubmit(event)} >
                <input
                type="text"
                placeholder={this.props.placeholder}
                autoFocus
                onChange={event => this.handleChange(event)}
                value={this.state.message}
                style={{borderColor: this.props.borderColor}}
                />
                <button className="sendButton" />
            </form>
        );
    }
}

export default InputMessage;