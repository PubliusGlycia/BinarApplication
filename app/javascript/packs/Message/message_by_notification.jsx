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

    componentDidMount() {
        this.fetchMessages();
    }

    render() {
        const messages = this.state.messages.map((message) => 
            <Message author={message.author} created={message.author} content={message.content} key={message.id} />)

        return (
            <>
                { messages }
                {/* <Message author='adamjedrzejec@gmail.com' created='16/07/2019 9:44' content='Random message 1'/>
                <Message author='jędrzejadamiec@gmail.com' created='16/07/2019 8:55' content='Message mess age messagemessage message.'/>
                <Message author='adamjarmułka@gmail.com' created='15/07/2019 12:16' content='iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAV1BMVEX///+ZmZmWlpbx8fGTk5OQkJDt7e2ampr29vahoaH5+fnV1dWenp6lpaXKysr8/Py/v7/e3t6urq65ubnW1tbj4'/> */}
            </>
        );
    }
}

ReactDOM.render(
    <>
        <MessageByNotification />
    </>, document.body.appendChild(document.createElement('div'))
);

// <% @news.order("id DESC").each do |news|  %>
//     <%= react_component('News', { :news => news }) %>
// <% end %>