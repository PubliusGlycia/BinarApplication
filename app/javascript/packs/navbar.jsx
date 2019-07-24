import React from 'react'
import CreateForm from './Notification/Create form/create_form';
import {Col, Row} from 'react-bootstrap';

export default class Navbar extends React.Component {

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark" id='binar-navi'>
                <span className="navbar-brand my-0 h1" href="#">BinarOffice</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav w-100">
                        <Row className="w-100">
                            <Col className="text-center"><CreateForm className="nav-item text-center" fetchPostEvents={this.props.fetchPostEvents}/></Col>
                            <Col><a className="nav-item nav-link active text-center" href="#">Zgłoszenia</a></Col>
                            { this.props.admin && <Col><a className="nav-item nav-link text-center" href="#">Archiwum</a></Col> }
                            { this.props.admin && <Col><a className="nav-item nav-link text-center" href="#">Ewidencja</a></Col> }
                            <Col><a className="nav-item nav-link text-center" href="#">Ustawienia</a></Col>
                        </Row>
                    </div>
                </div>
            </nav>
        );
    }
}
