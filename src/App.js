import React, { Component } from 'react';
import fire from './fire';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount(){
    /* Create reference to messages in Firebase Database */
    let messagesRef = fire.database().ref('new_data').orderByKey().limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      /* Update React state when message is added at Firebase Database */
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    })
  }
  addMessage(e){
    e.preventDefault(); // <- prevent form submit from reloading the page
    /* Send the message to Firebase */
    fire.database().ref('new_data').push( this.inputEl.value );
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <center><h1>Please tell me something</h1>
      <form onSubmit={this.addMessage.bind(this)}> 
         <br /><input  type="text" ref={ el => this.inputEl = el }/>
        <br /> <br /><input type="submit" value="Okay"/>
       <ul>
          { /* Render the list of messages */
            this.state.messages.map( message => <center><li key={message.id}>{message.text}</li></center> )
          }
        </ul>  
      </form>
    </center>
    );
  }
}

export default App;