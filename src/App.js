import React from "react";
import "./style.css";
import randomColorRGB from "random-color-rgb";
import generateName from "sillyname";
import MessageList from "./containers/MessageList";
import InputMessage from "./containers/InputMessage";

class App extends React.Component {
    constructor(){
        super();
        this.state = {
        userData: {
            userName: generateName(),
            userColor: randomColorRGB(),
        },
        messageData: [],
        placeholder: "Upišite poruku",
        borderColor: "black"
        }
    };

    componentDidMount(){
        this.drone = new window.Scaledrone('6fikEfTCMGJB05w5', {
            data: this.state.userData
        });
        this.drone.on('open', error => {
            if(error){
                return console.error(error);
            }
            const userData = {...this.state.userData};
            userData.userId = this.drone.clientId;
            this.setState({userData});
            /* console.log(this.state.userData); */
        });
        const room = this.drone.subscribe('observable-defcon13')
        room.on('data', (textualContent, member) => {
            const message = this.state.messageData;
            message.push({textualContent, member});
            this.setState({message});
            /* console.log(this.state.message); */
        });
    };
    

    componentWillUnmount(){
        this.drone.on('close', event => {
            this.drone.close();
          });
    };

    handleSendMessage = (message) => {
        if(message !== ""){
            this.setState({placeholder: "Upišite poruku"})
            this.setState({borderColor: "black"})
            this.drone.publish({
                room: "observable-defcon13",
                message
            });
        }
        else{
            this.setState({placeholder: "Popunite polje za unos!"})
            this.setState({borderColor: "red"})
        }   
    }

    render(){
        return(
            <div className="container">
              <header>
                <h2>Chatbox</h2>
                <div className="activeUserLineUp">
                  <div className="userIcon" style={{backgroundColor:this.state.userData.userColor}} />
                  <p className="activeUser">
                    {this.state.userData.userName}
                  </p>
                </div>
              </header>
              <MessageList userData={this.state.userData} messageData={this.state.messageData} />
              <InputMessage handleSendMessage={this.handleSendMessage} placeholder={this.state.placeholder} borderColor={this.state.borderColor} />
            </div>
        );
    }
}

export default App;
