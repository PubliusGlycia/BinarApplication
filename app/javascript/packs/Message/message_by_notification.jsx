import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message';
import axios from 'axios';

export default class MessageByNotification extends React.Component {

    state = {
        messages: []
    }

    fetchMessages = () => {
        axios.get("/messages.json").then((response) => {
            this.setState({ messages: response.data.users });
            console.log(this.state.messages);
        });
    }

    formatDate = (date) => {
        return date.slice(0, date.indexOf('T')) + ' at ' + date.slice(date.indexOf('T') + 1, date.lastIndexOf(':'))
    }

    componentDidMount() {
        this.fetchMessages();
    }

    render() {
        const messages = this.state.messages.map((message, i) => 
            <Message author={message.author} created={this.formatDate(message.created_at)} content={message.content} key={ i } />)
        return (
            <>
                { messages }
            </>
        );
    }
}

ReactDOM.render(
    <>
        <MessageByNotification />
    </>, document.body.appendChild(document.createElement('div'))
);
