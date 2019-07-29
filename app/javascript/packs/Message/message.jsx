import React from 'react';
import {Button, Card, Col, Form, Media, Row} from 'react-bootstrap';
import defaultProfilePicture from 'images/default_profile_picture.jpg';
import Axios from 'axios';

export default class Message extends React.Component {

    state = {
        editable: false,
        edited: false,
        content: '',
        contentBeforeEdit: '',
        validated: false,
        errorDescription: '',
        maxLength: 200
    };

    changeEditState = () => {
        if (this.state.editable == true && this.state.edited && this.state.validated) {
            this.handleSaveChanges();
            this.setState({ edited: false})
        }
        else if (this.state.editable == true && this.state.edited && !this.state.validated) {
            this.setState({ validated: true, edited: false})
        }
        this.setState({editable: !this.state.editable})
    };

    isEdited = (currentChange) => {
        if (currentChange == this.state.contentBeforeEdit)
            return false;
        else
            return true
    };


    formatDate = (date) => {
        return date.substring(0,10) + ' o ' + date.substring(11,16)
    };

    handleSaveChanges = () => {
        Axios.patch("/api/v1/messages/update_content/" + this.props.messageId + "/" + this.state.content + ".json").then(() => this.setState({ contentBeforeEdit: this.state.content}))
    };

    validateContent = (content) =>{
        this.setState(state => {
          return {
            errorDescription: (content.length <= this.state.maxLength ? '' : 'Komentarz nie może być dłuższy niż ' + this.state.maxLength + ' znaków'),
            validated: (content.length <= this.state.maxLength ? true : false)
            }
        });
      };

    componentDidMount() {
        this.setState({ content: this.props.content, contentBeforeEdit: this.props.content });
        this.validateContent(this.props.content)
    }

    render() {
        return (
            <Card className="my-2" style={{ background: "#595955", border: "2px solid #7c7d79",borderRadius: "2px" }}>
                <Card.Body>
                    <Media>
                        <img
                        width={56}
                        height={56}
                        className="mr-3 image-profile"
                        src={defaultProfilePicture}
                        alt="<profile pic>"
                        />
                        <Media.Body>
                            <Row>
                                <Col sm={9}>
                                    <h6 className="header-author"> { this.props.author } </h6>
                                    <div className="div-dates">
                                        Dodano: { this.formatDate(this.props.created) }

                                    { (this.props.created != this.props.updated) && <> <br/> Edytow.: { this.formatDate(this.props.updated) } </> }
                                    </div>
                                </Col>
                                { ((this.props.author === this.props.currentUserEmail) || (this.props.admin === true )) && (!this.props.archiveComment) &&
                                <Col>
                                    { !this.state.editable && <Button className='button-edit w-100' variant="secondary" onClick={this.changeEditState}>Edytuj</Button> }
                                    { (this.state.editable && this.state.edited && this.state.validated) && <Button className='button-save w-100' variant="secondary" onClick={this.changeEditState}>Zapisz</Button> }
                                    { ((this.state.editable && !this.state.edited) || !this.state.validated) && <Button className='button-cancel w-100' variant="secondary" onClick={this.changeEditState}>Anuluj</Button> }
                                </Col> }
                            </Row>

                            <hr className='mt-1 divider' />

                            { !this.state.editable &&
                            <div className="div-message-content">
                                { this.state.contentBeforeEdit }
                            </div> }

                            { this.state.editable &&
                                <Form>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control className="text-field" as="textarea" defaultValue={this.state.contentBeforeEdit} style={ this.state.errorDescription ? { outline: '2px solid #FF0000', MozOutlineRadius: '2px' } : {} }
                                    onChange={ (e) => { this.setState({content: e.target.value, edited: this.isEdited(e.target.value) }); this.validateContent(e.target.value) } } />
                                </Form.Group>
                            </Form> }

                        </Media.Body>
                    </Media>
                </Card.Body>
            </Card>
        );
    }
}
