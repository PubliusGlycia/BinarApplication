import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Container, Link} from 'react-bootstrap';
import mem from 'images/meme.jpeg';
import logo from 'images/ba.png';

export default class MainPage extends React.Component {
    state = {
        logged: false,
    };

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
                <Link to="/users/auth/google_oauth2">
                    <Button className="button-edit w-100" variant="secondary">
                    Log in with Gmail
                    </Button>
                </Link>
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