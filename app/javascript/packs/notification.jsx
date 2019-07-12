import React from 'react';
import { Button, Row } from 'react-bootstrap';
import { Modal, Col } from 'react-bootstrap';

export default class Notification extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false,
        };
      }
    
      handleClose() {
        this.setState({ show: false });
      }
    
      handleShow() {
        this.setState({ show: true });
      }

    importanceCheck() {
        if (this.props.importance == 'small') 
            return '!'
        else if (this.props.importance == 'medium')
            return '!!'
        else if (this.props.importance == 'important')
            return '!!!'
    }

    markAsInProgress(defect) {
        const isAdmin = defect.isAdmin;
        if(isAdmin){
            return (
            <Button variant="success" onClick={defect.handleProcess}>
                                        Zatwierdź
            </Button>
            );
        }
    }

    render() {
        return (
            <>
                
                <a className={this.props.isConfirmed 
                                ? 'list-group-item list-group-item-action list-group-item-success' 
                                : 'list-group-item list-group-item-action'}
                                onClick={this.handleShow}>

                    <div className='row'>
                        <h5 className='col-11'>{this.props.title}</h5>
                        <h1 className='col-1'>{this.importanceCheck()}</h1>
                    </div>
                </a>

                <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title className='justify-content-between' style={{width: '100%'}}>
                            <Row>
                                <Col md={7}>{this.props.title}</Col>
                                <Col md={1}>{this.props.importance}</Col>
                                <Col md={1}>{this.markAsInProgress}</Col>
                                <Col md={3} style={{textAlign: 'right'}}>
                                    <Button variant="primary" onClick={this.handleClose}>
                                        Edytuj
                                    </Button>
                                    <Button variant="secondary" onClick={this.handleClose}>
                                        Zamknij
                                    </Button>
                                </Col>
                            </Row>
                        </Modal.Title>
                    </Modal.Header>
                        <Modal.Body>
                            <Row>
                                <Col>{this.props.description}</Col>
                            </Row>
                            <Row>
                                <Col>{this.props.date}</Col> 
                            </Row>                                                                          
                        </Modal.Body>
                    <Modal.Footer>
                        <Col>Komentarze</Col>
                    </Modal.Footer>
                </Modal>
                
            </>
        )
    }
}