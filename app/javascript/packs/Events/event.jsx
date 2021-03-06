import React from 'react';
import {Button, Col, ListGroup, Modal, Row} from 'react-bootstrap';
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
import flame from "images/flame3.png"


export default class Event extends React.Component {
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
      photoUrl: '',
      isClicked: false,
      descriptionError: "",
      errImportance: "",
      errTitle: "",
      process: false,
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

    axios.patch("api/v1/post_events/" + this.props.notificationID + '.json', data,
      {
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        }
      }).then(() => {
        this.handleClose()
      }).catch((error) => {
        this.setState({ errTitle: error.response.data.title, errImportance: error.response.data.importance });
      })
  };

  handleClick = () => {
    this.setState(() => {
      if (this.props.importance == 'trivial') {
        return this.props.setImportance('important')

      } else if (this.props.importance == 'important') {
        return this.props.setImportance('trivial')
      }
    });
  };

  handleProcess = (e) => {
    e.stopPropagation()
    const data = new FormData();

    let newin_progress;

    if(this.props.in_progress == true){
        newin_progress= false;
    }else{
        newin_progress= true;

    }
    this.props.setProgress(newin_progress)

    data.append('post_event[in_progress]', newin_progress)
    axios.patch("api/v1/post_events/"+this.props.notificationID + '.json', data,
        {headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        }}).then(()=>{
            this.handleClose()
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
      return;
    else if (this.props.importance == 'important')
      return <img src={ flame }/>
  }

  fetchPhotoUrls() {
    this.setState({ isLoading: true });
    fetch('api/v1/post_events/' + this.props.notificationID + '.json')
      .then(response => response.json())
      .then(posts_events => {
        this.setState({ photo_urls: posts_events.images_url, isLoading: false });
      });
  }

  loadImages() {
    return this.state.photo_urls.map((photo, index) =>
      <>
        <Col style={{ width: "fit-content" }}>
          <Row>
            <Image
              src={`${photo.url} `}
              value={photo.url}
              onClick={() => this.showZoomInPhoto(photo.url)}
              style={{ objectFit: "contain", height: "10rem" }}
              fluid
            />
          </Row>
          <Row className="pt-1">
            <Button variant='primary'
              className="w-100"
              href={`api/v1/post_events/download/ ${this.props.notificationID} / ${index}`}
              target="_blank"
            >
              Pobierz ⬇️
                          </Button>
          </Row>
        </Col>
      </>
    );
  }

  showZoomInPhoto = (url) => {
    this.setState({ showPhoto: true, photoUrl: url })
  };

  closeZoomInPhoto() {
    this.setState({ showPhoto: false })
  }

  handleCheckbox = (value, checked) => {
    if (!checked) {
      this.props.notificationsToArchive(value, true)
    } else {
      this.props.notificationsToArchive(value, false)
    }
  };

  render() {

    const edit = this.state.edit;
    let button;
    let impText;
    let DeleteButton;
    let ProcessButton;
    let procText, active;

    if (this.props.importance == 'important') { impText = "Pilne"; }
    else { impText = "Niepilne"; }

    if(this.props.in_progress == true)
    {
      procText = 'primary'
      active = 'solid 2px #9C82D0';
    }
    else
    {
      procText = 'outline-primary';
      active = '';
    }

    if(this.props.admin)
      {
        ProcessButton =  <Button size="sm" variant={procText} onClick={this.handleProcess} > ✅ </Button>
      }

    if (this.props.currentUserId === this.props.user_id || this.props.admin) {
      DeleteButton = <DeleteAcceptancePopover
        notificationID={this.props.notificationID}
        handleClose={this.handleClose} />;

      if (edit) { button = <Button className="w-100" variant="secondary" onClick={this.handleSubmit}>Zapisz</Button> }
      else { button = <Button className="button-edit w-100" variant="secondary" onClick={this.handleEdit}>Edytuj</Button> }

    }
    else DeleteButton = <></>;

    let checkbox = this.props.admin
      ? <CheckBox
          className='post-event-checkbox'
          idValue={this.props.notificationID}
          checkFunction={this.handleCheckbox}
        />
      : '';

    return (
      <>
        <div
          style={{
            background: '#46473A',
            color: '#fff',
            borderRadius: '5px',
            border: active,
          }}
          onClick={this.handleShow}
          variant={this.props.isConfirmed ? 'success' : ''}
        >
          <Row>
            <Col md={{span: 1, offset: 1}}
              className="peCheckButton"
              >
              {checkbox}
            </Col>
            <Col
              md={6}
              as='h5'
              style={{ overflow: "hidden" }}
              className='titleName'
            >
              {this.props.title}
            </Col>
            <Col
              md={2}
              as='h3'
              className='processButton'
            >
              {ProcessButton}
            </Col>
            <Col md={2} className='like'>
              <Like notificationID={this.props.notificationID} />
            </Col>
          </Row>
          <Row>
            <Col
              md={{span: 9, offset: 0}}
              className='date'
              style={{ overflow: "hidden" }}
            >
              {'\n\n' + this.props.date.substring(0, 10) + ', ' + this.props.date.substring(11, 16)} przez {this.props.user_email}
            </Col>
            <Col
              md={2}
              as='h1'
            >
              {this.importanceCheck()}
            </Col>
          </Row>
        </div>

        <Modal
          size="lg"
          show={this.state.show}
          onHide={this.handleClose}
          style={{ color: '#FFFFFF', border: "2px solid #36372D" }}
        >
          <Modal.Header
            style={{ background: '#46473A' }}>
            <Modal.Title
              className='justify-content-between'
              style={{
                overflow: "hidden",
                width: '100%',
                position: 'relative',
              }}>
              <Row>
                <Col className="title" style={{ textAlign: "left", overflow: "hidden" }}>
                  <WarrningDiv error={this.state.errTitle}>
                    <InputField
                      type="text"
                      maxLength="40"
                      edit={edit}
                      value={this.props.title}
                      onChange={e => { this.props.setTitle(e.target.value) }}
                    />
                  </WarrningDiv>
                </Col>

                <Col xs={1}>
                  {ProcessButton}
                </Col>
                <Col>
                  <Row>
                    <Col className='px-1'>
                      <WarrningDiv error={this.state.errImportance}>
                        <ButtonInputField className="w-100" edit={edit} onClick={this.handleClick} >
                          {impText}
                        </ButtonInputField>
                      </WarrningDiv>
                    </Col>

                    <Col className='px-1'>
                      {button}
                    </Col>
                    <Col className='px-1'>
                      {DeleteButton}
                    </Col>
                    <Col className='pl-1'>
                      <Button className="button-close w-100"
                        variant="secondary"
                        onClick={this.handleClose}
                      >
                        Zamknij
                      </Button>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ background: '#46473A' }}>
            <Row>
              <Col
                className='description'
                style={{ overflow: "hidden" }}
              >
                <AreaInputField
                  edit={edit}
                  style={{ width: '100%' }}
                  value={this.props.description}
                  onChange={e => { this.props.setDescription(e.target.value) }}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              {this.state.isLoading
                ? "loading image" :
                <Col>
                  {this.loadImages()}
                </Col>
              }
            </Row>
            <Row className="mt-3">
              <Col className='indate'>
                {"\n\n"}Dodano {this.props.date.substring(0, 10) + ', '}
                {this.props.date.substring(11, 16)} przez {this.props.user_email}
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer
            style={{ background: '#46473A' }}>
            <Col>
              <p className="p-comment-header">Komentarze</p>
              <MessageByNotification
                  admin={this.props.admin }
                  currentUserEmail={this.props.currentUserEmail}
                  notificationID={this.props.notificationID}
                  archiveComment={false}/>
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
                src={`${this.state.photoUrl}`}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
            : ''}
        </Modal>
      </>
    )
  }
}
