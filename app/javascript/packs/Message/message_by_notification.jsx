import React from 'react';
import Message from './message';
import MessageForm from './message_form';
import axios from 'axios';

export default class MessageByNotification extends React.Component {

    state = {
        messages: []
    }

    fetchMessages = () => {
        axios.get("/api/v1/messages_by_post/" + this.props.notificationID + ".json").then((response) => {
            this.setState({ messages: response.data.messages });
        });
    }

    formatDate = (date) => {
        return date.substring(0,10) + ' at ' + date.substring(11,16)
    }

    componentDidMount() {
        this.fetchMessages();
    }

    render() {
        const messages = this.state.messages.sort((a, b) => a.created_at < b.created_at ).map((message) => 
            <Message author={message.author} created={this.formatDate(message.created_at)} content={message.content} key={ message.id } />)
        return (
            <>
                <MessageForm notificationID={this.props.notificationID} userID={this.state.userID} fetchMessages={this.fetchMessages} />
                { messages }
            </>
        );
    }
}
