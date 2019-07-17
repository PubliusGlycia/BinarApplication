import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal, Image } from 'react-bootstrap';
import axios from 'axios';

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


    handleDelete = (e) =>{
        axios.delete('/post_events/'+ this.props.NotificationID,
            {headers: {
                    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
                }}).then(response => {
            console.log('Deleted post with id: ');
            this.handleClose();
            this.props.fetchPostEvents();
        });

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
    importanceCheck() {
        if (this.props.importance == 'trivial') 
            return '!'
        else if (this.props.importance == 'important')
            return '!!!'
    }

    render() {
        return (
            <>
                <ListGroup.Item action onClick={this.handleShow} variant={this.props.isConfirmed ? 'success' : ''}>
                    <Row>
                        <Col md={11} as='h5'>{this.props.title}</Col>
                        <Col md={1} as='h1'>{this.importanceCheck()}</Col>
                    </Row>
                </ListGroup.Item>

                <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title className='justify-content-between' style={{width: '100%'}}>
                            <Row>
                                <Col md={6}>{this.props.title}</Col>
                                <Col md={1}>{this.props.importance}</Col>
                                <Col md={1}>{this.markAsInProgress}</Col>
                                <Col md={4} style={{textAlign: 'right'}}>
                                    <Button variant="primary" onClick={this.handleClose}>
                                        Edytuj
                                    </Button>
                                    <Button variant="primary" onClick={this.handleDelete}>
                                        Usuń
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
                                <Col><Image src="{this.props.images}/171x180" thumbnail/> </Col>
                            </Row>
                            <Row>
                                <Col>{"\n\n"}Dodano {this.props.date.substring(0,10)} {this.props.date.substring(11,16)} przez {this.props.key}</Col> 
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