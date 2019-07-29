import React from "react";
import {Button, Card, Col, ListGroup, Modal, Row} from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Like from "../like";
import WarrningDiv from "../Create form/warrning_div";
import InputField from "../../input_field";
import ButtonInputField from "../../button_input_field";
import AreaInputField from "../../area_input_field";
import MessageByNotification from "../../Message/message_by_notification";

export default class ArchiveNotification extends React.Component {

    state = {
        show: false,
        photo_urls: [],
        isLoading: true,
        showPhoto: false,
        photoUrl:'',
        isClicked: false,
        descriptionError: "",
        errImportance: "",
        errTitle: "",
    };

    handleShow = () => {
        this.fetchPhotoUrls();
        this.setState({ show: true });
    };

    handleClose = () => {
        this.setState({ show: false, showPhoto: false });
    };

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

    render() {

        const edit = this.state.edit;

        let impText;
        if(this.props.importance == 'important'){ impText = "Pilne"; }
        else{ impText = "Niepilne"; }

        return (
            <>
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
                            <Like notificationID={ this.props.notificationID }
                                  archiveLike={true} />
                        </Col>
                        <Col
                            md={1}
                            as='h1'
                        >
                            { this.importanceCheck()}
                        </Col>
                    </Row>
                </ListGroup.Item>

                <Modal
                    size="lg"
                    show={this.state.show}
                    onHide={this.handleClose}
                >
                    <Modal.Header>
                        <Modal.Title
                            className='justify-content-between'
                            style={{overflow: "hidden",
                                width: '100%',
                                position: 'relative'
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
                                    <div>Pilność</div>
                                    <WarrningDiv error={this.state.errImportance}>
                                        <ButtonInputField edit={edit} onClick={this.handleClick} >
                                            {impText}
                                        </ButtonInputField>
                                    </WarrningDiv>
                                </Col>
                                <Col md={3} />
                                <Col
                                    md={2}
                                    style={{textAlign: 'right'}}
                                >
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
                    <Modal.Body>
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
                                ? "loading image"
                                : <Col><Row>{this.loadImages()}</Row></Col>
                            }
                        </Row>
                        <Row>
                            <Col className='date'>
                                {"\n\n"}Dodano {this.props.date.substring(0,10) + ', '}
                                {this.props.date.substring(11,16)} przez User
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Col>
                            <p>Komentarze</p>
                            <MessageByNotification admin={this.props.admin }
                                                   currentUserEmail={ this.props.currentUserEmail }
                                                   notificationID={this.props.notificationID}
                                                   archiveComment={true} />
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