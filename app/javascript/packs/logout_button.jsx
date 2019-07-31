import React from 'react';
import {Button, Link } from 'react-bootstrap';

export default class LogoutButton extends React.Component {
    state = { }

    render() {
        const LogButton = () => (

                <Button className="button-edit w-100" variant="secondary">Wyloguj się</Button>

        );

        return (<LogButton />)
    }
}