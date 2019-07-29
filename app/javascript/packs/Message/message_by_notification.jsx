import React from 'react';
import Message from './message';
import MessageForm from './message_form';
import axios from 'axios';

export default class MessageByNotification extends React.Component {

    state = {
        messages: []
    };

    fetchMessages = () => {
        axios.get("/api/v1/messages_by_post/" + this.props.notificationID + ".json").then((response) => {
            this.setState({ messages: response.data.messages });
        });
    };

    componentDidMount() {
        this.fetchMessages();
    }

    render() {
        const messages = this.state.messages.sort((a, b) => a.created_at < b.created_at ).map((message) => 
            <Message
            author={message.author}
            created={message.created_at}
            updated={message.updated_at}
            content={message.content}
            messageId={ message.id }
            admin={ this.props.admin }
            currentUserEmail={ this.props.currentUserEmail }
            key={ message.id }
            archiveComment={this.props.archiveComment}/>);

        let display;

        if(this.props.archiveComment === false)
        {
            display =
                <>
                    <MessageForm notificationID={this.props.notificationID}
                                 userID={this.state.userID}
                                 fetchMessages={this.fetchMessages} />
                    { messages }
                </>
        }else{
            display =
                <>
                    { messages }
                </>
        }
        return (
            <>
                { display }
            </>
        );
    }
}
