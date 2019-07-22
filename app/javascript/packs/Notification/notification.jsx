import React from 'react';
import {Button, Card, Col, ListGroup, Modal, Row} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import axios from 'axios';

export default class Notification extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.closeZoomInPhoto = this.closeZoomInPhoto.bind(this);

        this.state = {
            show: false,
            photo_urls: [],
            isLoading: true,
            showPhoto: false,
            photoUrl:''
        }
    }

    handleClose() {
        this.setState({ show: false, showPhoto: false });
    }
    
    handleShow() {
        this.fetchPhotoUrls();
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

    };

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
            return '!';
        else if (this.props.importance == 'important')
            return '!!!'
    }

    fetchPhotoUrls() {
        this.setState({ isLoading: true });
        fetch('/post_events/'+ this.props.NotificationID +'.json')
            .then(response => response.json())
            .then(posts_events => {
                this.setState({ photo_urls: posts_events.images_url, isLoading: false});
            });
    }

    loadImages() {
        return this.state.photo_urls.map((photo, index) =>
            <Card key={index} style={{ width: '15rem' }}>
                <Card.Body>
                    <Image src={ `/ ${photo.url} `} value={photo.url} onClick={() => this.showZoomInPhoto(photo.url)} fluid/>
                    <Button href={`/post_events/download/ ${this.props.NotificationID} / ${index}`} target="_blank"> Download </Button>
                </Card.Body>
            </Card>
        );
    }

    showZoomInPhoto = (url) => {
        this.setState({showPhoto: true, photoUrl:url})
    };

    closeZoomInPhoto() {
        this.setState({showPhoto: false})
    }

    render() {
        return (
            <>
                <ListGroup.Item action  style={{ background: '#46473A' , color: '#fff', borderRadius: '5px' }} onClick={this.handleShow} variant={this.props.isConfirmed ? 'success' : ''}>
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
                                {this.state.isLoading
                                    ? "loading image"
                                    :   <Col>
                                            <Row>
                                                {this.loadImages()}
                                            </Row>
                                        </Col>}

                            </Row>
                            <Row>
                                <Col>{"\n\n"}Dodano {this.props.date.substring(0,10)} {this.props.date.substring(11,16)} przez {this.props.key}</Col> 
                            </Row>                                                                          
                        </Modal.Body>
                    <Modal.Footer>
                        <Col>Komentarze</Col>
                    </Modal.Footer>

                    {this.state.showPhoto
                        ? <div className="photoDiv" >
                            <Button variant="dark" className="float-right" onClick={this.closeZoomInPhoto}>Close</Button>
                            <img src={ `/ ${this.state.photoUrl}`} style={{width: '100%',height: '100%'}}/>
                        </div>
                        : ''  }

                </Modal>
            </>
        )
    }
}