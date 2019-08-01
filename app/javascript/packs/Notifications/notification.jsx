import React from 'react';

export default class Notification extends React.Component {

    render (){
        let output;

        switch(this.props.notification_type.toString()) {
            case '1': return output = <i>Użytkownik: {this.props.user_email} dodał zgłoszenie {this.props.notification_count}</i>;
            case '2': return output = <i>Użytkownik: {this.props.user_email} edytował zgłoszenie {this.props.notification_count}</i>;
            case '3': return output = <i>Użytkownik: {this.props.user_email} usunął zgłoszenie {this.props.notification_count}</i>;
            case '4': return output = <i>Oficer biura zatwierdził twoje zgłoszenie {this.props.notification_count}</i>;
            case '5': return output = <i>Post: {this.props.post_event_id} został skomentowany {this.props.notification_count}</i>;
            default:
                return 'Brak powiadomienia';
        }

        return (<>{output}</>)
    }
}

