import React from 'react';
import ReactDOM from 'react-dom';
import Message from './message';
import MessageForm from './message_form';
import axios from 'axios';

export default class MessageByNotification extends React.Component {

    state = {
        messages: []
    }

    fetchMessages = () => {
        axios.get("/messages_by_post/" + this.props.notifID + ".json").then((response) => {
            this.setState({ messages: response.data.messages });
        });
    }

    formatDate = (date) => {
        return date.slice(0, date.indexOf('T')) + ' at ' + date.slice(date.indexOf('T') + 1, date.lastIndexOf(':'))
    }

    componentDidMount() {
        this.fetchMessages();
    }

    render() {
        const messages = this.state.messages.sort((a, b) => a.created_at < b.created_at ).map((message, i) => 
            <Message author={message.author} created={this.formatDate(message.created_at)} content={message.content} key={ i } />)
        console.log(this.state.messages);
        return (
            <>
                <MessageForm notifID={this.props.notifID} userID={this.state.userID} />
                { messages }
            </>
        );
    }
}

// ReactDOM.render(
//     <>
//         <MessageForm />
//         <MessageByNotification />
//     </>, document.body.appendChild(document.createElement('div'))
// );
