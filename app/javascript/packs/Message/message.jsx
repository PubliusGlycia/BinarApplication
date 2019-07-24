import React from 'react';
import { Media, Card, Row, Col, Button, Form } from 'react-bootstrap';
import defaultProfilePicture from 'images/default_profile_picture.jpg';
import Axios from 'axios';

export default class Message extends React.Component {

    state = {
        editable: false,
        content: ''
    };

    changeEditState = () => {
        if (this.state.editable == true) {
            this.handleSaveChanges()
        }
        this.setState({editable: !this.state.editable})
    }

    handleSaveChanges = () => {
        Axios.patch("/api/v1/messages/update_content/" + this.props.messageId + "/" + this.state.content + ".json")
    }

    componentDidMount() {
        this.setState({ content: this.props.content })
    }

    render() {

        return (
            <Card className='my-2' style={{ width: '90%', background: '#2B185C' }}>
                <Card.Body style={{ maxWidth: '100%'}}>
                    <Media>
                        <img
                        width={56}
                        height={56}
                        className="mr-3"
                        src={defaultProfilePicture}
                        alt="<profile pic>"
                        style={{ outline: '2px solid #9C82D0', MozOutlineRadius: '2px' }}
                        />
                        <Media.Body>
                            <Row>
                                <Col sm={9}>
                                    <h6 style={{ font: 'Muli', color: '#EEE' }}>{ this.props.author }</h6>
                                    <div style={{ font: 'Muli', fontSize: '11px', color:'#EEE' }}>
                                        Dodano: { this.props.created }
                                    
                                    { (this.props.created != this.props.updated) && <> <br/> Edytow.: { this.props.updated } </> }
                                    </div>
                                </Col>
                                { ((this.props.author == this.props.currentUserEmail) || (this.props.currentUserId == true)) &&
                                <Col>
                                    { !this.state.editable && <Button className='button-edit w-100' variant="warning" onClick={this.changeEditState}>Edytuj</Button> }
                                    { this.state.editable && <Button className='button-edit w-100' variant="success" onClick={this.changeEditState}>Zapisz</Button> }
                                </Col> }
                            </Row>

                            <hr className='mt-1' style={{ background: '#9C82D0' }}/>

                            { !this.state.editable &&
                            <div style={{ font: 'Muli', fontSize: '13px', color:'#EEE', wordBreak: 'break-word' }}>
                                { this.state.content }
                            </div> }

                            { this.state.editable &&
                                <Form>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Control as="textarea" defaultValue={this.state.content} 
                                    onChange={ (e) => this.setState({content: e.target.value }) } />
                                </Form.Group>
                            </Form> }

                        </Media.Body>
                    </Media>
                </Card.Body>
            </Card>
        );
    }
}
