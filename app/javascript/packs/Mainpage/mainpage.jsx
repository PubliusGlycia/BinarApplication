import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Container} from 'react-bootstrap';
import mem from 'images/meme.jpeg';
import logo from 'images/ba.png';

export default class MainPage extends React.Component {
    state = {
        logged: false,
    };

    toAuth() {
        this.setState({logged: true})
    }

    render() {
        return (
        <>
        <Container className='title'>
            <div>
                <img src={ logo }/>
            </div>
            <div>
                BinarOffice
            </div>
            <div>
                <Button variant='success' onClick={this.toAuth}>Zaloguj się przez Gmail</Button>
            </div>
            <div>
                <img src={mem} />
            </div>
        </Container>
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