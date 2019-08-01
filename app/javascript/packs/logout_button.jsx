import React from 'react';
import {Button, Link } from 'react-bootstrap';

export default class LogoutButton extends React.Component {
    state = { }

    render() {
        const LogButton = () => (
            <a  data-method='delete'
                href="/users/sign_out">
                <Button className="button-edit w-100" variant="secondary">Wyloguj się</Button>
            </a>
        );

        return (<LogButton />)
    }
}