import React from 'react';

export default class Notification extends React.Component {

    render (){
        let output;

        switch(this.props.notification_type.toString()) {
            case '1': return output = <i>Użytkownik: {this.props.user_email} dodał zgłoszenie</i>;
            case '2': return output = <i>Post użytkownika został edytowany </i>;
            case '3': return output = <i>Użytkownik: {this.props.user_email} usunął zgłoszenie </i>;
            case '4': return output = <i>Oficer biura zatwierdził twoje zgłoszenie </i>;
            case '5': return output = <i>Post użytkownika  {this.props.user_email} został skomentowany</i>;
            default:
                return <i>Brak powiadomienia</i>;
        }

        return (<>{output}</>)
    }
}

