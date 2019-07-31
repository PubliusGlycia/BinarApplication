import React from 'react';
import {Button, ListGroup, OverlayTrigger, Popover} from 'react-bootstrap';

export default class LogoutButton extends React.Component {
    state = {
        isClicked: false
    }

    logoutClick = () => {

    };

    render() {
        const LogButton = () => (
            <Button size="sm" variant='success'>Wyloguj się</Button>
        );

        return (<LogButton />)
    }
}