import React, { Component } from 'react';
import fire from './fire';
import AppLayout from './AppLayout';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] }; // <- set up react state
  }
  componentWillMount() {
    let messagesRef = fire
      .database()
      .ref('messages')
      .orderByKey()
      .limitToLast(100);
    messagesRef.on('child_added', snapshot => {
      let message = { text: snapshot.val(), id: snapshot.key };
      this.setState({ messages: [message].concat(this.state.messages) });
    });
  }
  addMessage(e) {
    e.preventDefault();
    fire
      .database()
      .ref('messages')
      .push(this.inputEl.value);
    this.inputEl.value = ''; // <- clear the input
  }
  render() {
    return (
      <div>
        <AppLayout />
        <form onSubmit={this.addMessage.bind(this)}>
          <input type="text" ref={el => (this.inputEl = el)} />
          <input type="submit" />
          <ul>
            {this.state.messages.map(message => (
              <li key={message.id}>{message.text}</li>
            ))}
          </ul>
        </form>
      </div>
    );
  }
}

export default App;
