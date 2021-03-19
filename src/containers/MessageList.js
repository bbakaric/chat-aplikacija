import React from "react";
import uniqueString from "unique-string";

class MessageList extends React.Component {
    componentDidMount() {
        this.p.scrollIntoView({behavior: "smooth"});
    }

    componentDidUpdate() {
        this.p.scrollIntoView({behavior: "smooth"});
    }

    printMessage(message){
        const {textualContent, member} = message;
        const randomKey = uniqueString();
        const myMessage = member.id === this.props.userData.userId;
        const messageDisplay = myMessage ? "mainUser" : "guestUser";
        /* console.log(message); */
        return(
            <li className={messageDisplay} key={randomKey}>
                <p className="userName">
                    {member.clientData.userName}
                </p>
                <p style={{backgroundColor:member.clientData.userColor}} className="text">
                    {textualContent}
                </p>
            </li>
        );
    }
    
    render(){
        return(
                <ul className="messageContainer">
                    {this.props.messageData.map( (message) => this.printMessage(message))}
                    <p ref={(p)=>{this.p = p}} style={{margin: 0, padding: 0}}/>
                </ul>
        );
    }
}

export default MessageList;