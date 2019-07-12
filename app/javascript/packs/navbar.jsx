import React from 'react'
import CreateForm from './create_form';
import { Container, Row, Col } from 'react-bootstrap';

export default class Navbar extends React.Component {

    state = {
        defects: [],
        supplies: [],
        isLoadingDefects: false,
        isLoadingSupplies: false
    }

    fetchPostEvents = () => {
        this.setState({ isLoadingDefects: true, isLoadingSupplies: true })
        fetch("/post_events/event/defect.json")
          .then(response => response.json())
          .then(posts_events => {
            this.setState({ defects: posts_events, isLoadingDefects: false });
            });
        fetch("/post_events/event/supply.json")
            .then(response => response.json())
            .then(posts_events => {
              this.setState({ supplies: posts_events, isLoadingSupplies: false });
              });
    };

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark styled">
                    <style dangerouslySetInnerHTML={{__html: `
                        .styled { background-color: #4919aa; }
                    `}} />
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
