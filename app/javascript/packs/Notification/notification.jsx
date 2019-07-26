import React from 'react';
import {Button, Card, Col, ListGroup, Modal, Row} from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import axios from 'axios';
import MessageByNotification from '../Message/message_by_notification'
import WarrningDiv from './Create form/warrning_div';
import InputField from '../input_field';
import AreaInputField from '../area_input_field';
import ButtonInputField from '../button_input_field';
import Like from './like';
import CheckBox from './Archive/check_box';
import DeleteAcceptancePopover from "../delete_acceptance_popover"

export default class Notification extends React.Component {
    constructor(props, context) {
        super(props, context);

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.closeZoomInPhoto = this.closeZoomInPhoto.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleProcess = this.handleProcess.bind(this);

        this.state = {
            show: false,
            photo_urls: [],
            isLoading: true,
            showPhoto: false,
            photoUrl:'',
            isClicked: false,
            descriptionError: "",
            errImportance: "",
            errTitle: "",
            inProgress: false,
        }
    }

    handleSubmit = (e) => {
        this.setState({ edit: false });
        e.preventDefault();
        const data = new FormData();

        data.append('post_event[title]', this.props.title);
        data.append('post_event[description]', this.props.description);
        data.append('post_event[category]', this.props.category);
        data.append('post_event[importance]', this.props.importance);
        data.append('post_event[inProgress]', this.props.inProgress)

        axios.patch("api/v1/post_events/"+this.props.notificationID + '.json', data,
        {headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        }}).then(()=>{
            this.handleClose()
        }).catch((error) =>{
            this.setState({errTitle: error.response.data.title, errImportance: error.response.data.importance});
        })
    };

    handleClick = () => {
        console.log(this.props.importance)
        this.setState(isClicked => {
            if(this.props.importance == 'trivial'){
                return this.props.setImportance('important')

            }else if(this.props.importance == 'important'){
                return this.props.setImportance('trivial')
            }
        });
    };

    handleProcess = () => {
        console.log(this.props.inProgress)
        this.setState(isClicked => {
            if(this.props.inProgress == true){
                return this.props.setProgress(false)
            }else{
                return this.props.setProgress(true)
            }
        })
    }

    handleEdit = () => {
        this.setState({ edit: true });
    };

    handleClose() {
        this.setState({ show: false, showPhoto: false });
        this.props.fetchPostEvents();
    }

    handleShow() {
        this.fetchPhotoUrls();
        this.setState({ show: true });
    }

    importanceCheck() {
        if (this.props.importance == 'trivial')
            return '!';
        else if (this.props.importance == 'important')
            return '!!!'
    }

    fetchPhotoUrls() {
        this.setState({ isLoading: true });
        fetch('api/v1/post_events/'+ this.props.notificationID +'.json')
            .then(response => response.json())
            .then(posts_events => {
                this.setState({ photo_urls: posts_events.images_url, isLoading: false});
            });
    }

    loadImages() {
        return this.state.photo_urls.map((photo, index) =>
            <Card
              key={index}
              style={{ width: '15rem' }}>
                <Card.Body>
                    <Image
                      src={ `${photo.url} `}
                      value={photo.url}
                      onClick={() => this.showZoomInPhoto(photo.url)}
                      fluid
                    />
                    <Button
                      href={`api/v1/post_events/download/ ${this.props.notificationID} / ${index}`}
                      target="_blank"
                      >
                        Download
                    </Button>
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

    handleCheckbox = (value,checked) => {
        if (!checked){
            this.props.notificationsToArchive(value,true)
        }else{
            this.props.notificationsToArchive(value,false)
        }
    };

    render() {

        const edit = this.state.edit;
        let button;
        let impText;
        let DeleteButton;
        let procText;

        if(this.props.importance == 'important'){ impText = "Pilne"; }
        else{ impText = "Niepilne"; }

        if(this.props.currentUserId === this.props.user_id || this.props.admin)
        {
            DeleteButton = <DeleteAcceptancePopover
                            notificationID={this.props.notificationID}
                            handleClose={this.handleClose}/>

        if(edit){ button = <Button variant="success" onClick={this.handleSubmit}>Zapisz</Button> }
        else{ button = <Button variant="success" onClick={this.handleEdit}>Edytuj</Button> }

        }
        else DeleteButton = <></>

        if(this.props.currentUserId === this.props.user_id)
        {
            if(this.props.inProgress == true){ procText = 'success'; }
            else{ procText = 'outline-success'; }
        }

        return (
            <>
                {this.props.admin
                        ? <CheckBox
                        idValue={this.props.notificationID}
                        checkFunction={this.handleCheckbox}
                        />
                        : '' }

                <ListGroup.Item
                  action
                  style={{ background: '#46473A',
                           color: '#fff',
                           borderRadius: '5px' }}
                  onClick={this.handleShow}
                  variant={this.props.isConfirmed ? 'success' : '' }
                  >
                    <Row>
                        <Col
                          md={10}
                          as='h5'
                          style={{ overflow: "hidden" }}
                          >
                            {this.props.title}
                        </Col>
                        <Col md={1}>
                            <Like notificationID={ this.props.notificationID }/>
                        </Col>
                        <Col
                          md={1}
                          as='h1'
                          >
                            { this.importanceCheck() }
                        </Col>
                    </Row>
                </ListGroup.Item>

                <Modal
                  size="lg"
                  show={this.state.show}
                  onHide={this.handleClose}
                  style={{ color: '#FFFFFF' }}
                  >
                    <Modal.Header
                        style={{ background: '#9C82D0' }}>
                        <Modal.Title
                          className='justify-content-between'
                          style={{overflow: "hidden",
                                  width: '100%',
                                  position: 'relative',
                          }}>
                            <Row>
                                <Col md={6} style={{overflow: "hidden"}}>
                                    <WarrningDiv error={this.state.errTitle}>
                                        <InputField
                                          type="text"
                                          maxLength="40"
                                          edit={edit}
                                          value={this.props.title}
                                          onChange={e =>{ this.props.setTitle(e.target.value)}}
                                        />
                                    </WarrningDiv>
                                </Col>

                                <Col md={1}>
                                    <ButtonInputField
                                        variant={procText} edit={edit} onClick={this.handleProcess} >
                                        {`✅`}
                                    </ButtonInputField>
                                </Col>

                                <Col md={1}>
                                    <WarrningDiv error={this.state.errImportance}>
                                        <ButtonInputField
                                            variant={'info'} edit={edit} onClick={this.handleClick} >
                                            {impText}
                                        </ButtonInputField>
                                    </WarrningDiv>
                                </Col>

                                <Col
                                  md={4}
                                  style={{textAlign: 'right'}}
                                  >
                                    {button}
                                    {DeleteButton}
                                    <Button
                                      variant="secondary"
                                      onClick={this.handleClose}
                                      >
                                        Zamknij
                                    </Button>
                                </Col>

                            </Row>
                        </Modal.Title>
                    </Modal.Header>
                        <Modal.Body
                            style={{ background: '#9C82D0' }}>
                            <Row>
                                <Col
                                  className='description'
                                  style={{overflow: "hidden"}}
                                  >
                                    <AreaInputField
                                      edit={edit}
                                      style={{width: '100%'}}
                                      value={this.props.description}
                                      onChange={e =>{this.props.setDescription(e.target.value)}}
                                    />
                                </Col>
                            </Row>
                            <Row>
                                <Col className='image'>
                                    <InputField
                                      edit={edit}
                                      value={this.props.image}
                                      onChange={e => {this.props.setImages(e.target.value)}}
                                      type="file"
                                    />
                                </Col>
                                {this.state.isLoading
                                    ? "loading image" : <Col>
                                    <Row>
                                        {this.loadImages()}
                                    </Row></Col>
                                }
                            </Row>
                            <Row>
                                <Col className='date'>
                                    {"\n\n"}Dodano {this.props.date.substring(0,10) + ', '}
                                    {this.props.date.substring(11,16)} przez User
                                </Col>
                            </Row>
                        </Modal.Body>
                    <Modal.Footer
                        style={{ background: '#9C82D0' }}>
                        <Col>
                            <p>Komentarze</p>
                            <MessageByNotification currentUserEmail={ this.props.currentUserEmail } notificationID={this.props.notificationID} />
                        </Col>
                    </Modal.Footer>

                    {this.state.showPhoto
                      ? <div className="photoDiv" >
                            <Button
                              variant="dark"
                              className="float-right"
                              onClick={this.closeZoomInPhoto}
                              >
                                Close
                            </Button>
                            <img
                              src={ `${this.state.photoUrl}`}
                              style={{width: '100%',height: '100%'}}
                            />
                        </div>
                      : '' }
                </Modal>
            </>
        )
    }
}
