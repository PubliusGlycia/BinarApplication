import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Card, Col, ListGroup, Modal, Row} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

export default class MainPage extends React.Component {
    state = {
        logged: false,
    };

    render() {
        return (
        <>
                <div className='title'>
                    Hello!

                </div>
        </>
        );
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      < MainPage />,
      document.body.appendChild(document.createElement('div')),
    )
  });