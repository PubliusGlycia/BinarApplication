import React from 'react';
import {Button, Card, Col, ListGroup, Modal, Row} from 'react-bootstrap';
import Image from 'react-bootstrap/Image'
import { ListGroup, Row, Col, ToggleButton } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal, Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import WarrningDiv from './Create form/warrning_div';

export default class Notification extends React.Component {
    constructor(props, context) {
        super(props, context);
    
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.closeZoomInPhoto = this.closeZoomInPhoto.bind(this);
        this.handleClick = this.handleClick.bind(this);

        this.state = {
            show: false,
            photo_urls: [],
            isLoading: true,
            showPhoto: false,
            photoUrl:'',
            isClicked: false,
            descriptionError: "",
            errImportance: "",
            errTitle: ""
        }
    }

    handleSubmit = (e) => {
        this.setState({ edit: false });
        e.preventDefault();
        const data = new FormData();

        data.append('post_event[title]', this.props.title)
        data.append('post_event[description]', this.props.description)
        data.append('post_event[category]', this.props.category)
        data.append('post_event[importance]', this.props.importance)

        axios.patch("/post_events/"+this.props.NotificationID + '.json', data,
        {headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        }}).then(()=>{
            this.handleClose()
        }).catch((error) =>{
            this.setState({errTitle: error.response.data.title, errImportance: error.response.data.importance});
            console.log(this.state.errTitle);
            console.log(this.state.errImportance)
        })
    };


    handleClick = () => {
        this.setState(isClicked => {
            if(this.props.importance == 'trivial'){
                return this.props.setImportance('important')

            }else if(this.props.importance == 'important'){
                return this.props.setImportance('trivial')
            }
        });
    }

    handleEdit = () => {
        this.setState({ edit: true });
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

        const edit = this.state.edit;
        let button;

        if(edit){ button = <Button variant="success" onClick={this.handleSubmit}>Zapisz</Button> }
        else{ button = <Button variant="success" onClick={this.handleEdit}>Edytuj</Button> }

        let impText;
        if(this.props.importance == 'important'){ impText = "Pilne"; }
        else{ impText = "Niepilne"; }

        return (
            <>
                <ListGroup.Item action  style={{ background: '#46473A' , color: '#fff', borderRadius: '5px' }} onClick={this.handleShow} variant={this.props.isConfirmed ? 'success' : ''}>
                    <Row>
                        <Col md={11} as='h5' style={{overflow: "hidden"}}>{this.props.title}</Col>
                        <Col md={1} as='h1'>{this.importanceCheck()}</Col>
                    </Row>
                </ListGroup.Item>

                <Modal size="lg" show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header>
                        <Modal.Title className='justify-content-between'
                        style={{overflow: "hidden",
                                width: '100%',
                                position: 'relative'
                                }}>

                            <Row>
                                <Col md={6} style={{overflow: "hidden"}}>
                                <WarrningDiv error={this.state.errTitle}>
                                <InputField type="text" maxLength="40" edit={edit} value={this.props.title}
                                    onChange={e =>{
                                      this.props.setTitle(e.target.value)
                                    }}>
                                </InputField>
                                </WarrningDiv>
                                </Col>

                                <Col md={1}>
                                <div>Pilność</div>
                                <WarrningDiv error={this.state.errImportance}>
                                    <ButtonInputField edit={edit} onClick={this.handleClick} >{impText}
                                </ButtonInputField>
                                </WarrningDiv>
                                </Col>

                                <Col md={1}>
                                {this.markAsInProgress}
                                </Col>

                                <Col md={4} style={{textAlign: 'right'}}>
                                    {button}
                                    <Button variant="danger" onClick={this.handleDelete}>
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
                            <Col className='description' style={{overflow: "hidden"}}>
                                    <AreaInputField edit={edit} style={{width: '100%'}}
                                    value={this.props.description}
                                    onChange={e =>{this.props.setDescription(e.target.value)}}>
                                    </AreaInputField>
                            </Col>
                            </Row>
                            <Row>
                                <Col className='image'>
                                  <InputField edit={edit} value={this.props.image} onChange={e =>{
                                      this.props.setImages(e.target.value)
                                  }} type="file"></InputField>
                                </Col>
                                {this.state.isLoading
                                    ? "loading image"
                                    :   <Col>
                                            <Row>
                                                {this.loadImages()}
                                            </Row>
                                        </Col>}

                            </Row>
                            <Row>
                                <Col className='date'>{"\n\n"}Dodano {this.props.date.substring(0,10)}
                                  {this.props.date.substring(11,16)} przez User</Col>
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

class InputField extends React.Component {
    render() {
      return this.props.edit ? (
        <input onChange={this.props.onChange} type={this.props.type} value={this.props.value} />
      ) : <div>{this.props.value}</div>
    }
  }

class AreaInputField extends React.Component {
    render() {
      const {edit, value, ...rest} = this.props;

      return edit ? (
        <textarea value={value} {...rest} />
      ) : <div>{value}</div>
    }
  }

class ButtonInputField extends React.Component {
    render() {
      const {edit, onClick, value, ...rest} = this.props;

      return edit ? (
        <Button variant="info" onClick={onClick} value={value} {...rest} />
      ) : <div>{value}</div>
    }
  }