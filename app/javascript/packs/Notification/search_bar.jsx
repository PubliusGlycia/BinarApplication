import React from 'react';
import { Form, Col, Button } from 'react-bootstrap';

export default class SearchBar extends React.Component {
    state = {
        phrase: ''
    }
    handleChange = (e) => {
        this.setState({phrase: e.target.value})
        console.log(this.state.phrase)
        this.props.fetchPostEventsWhenSearch(this.state.phrase)
    }
    render() {
        return (
            <>
                <Form>
                    <Form.Row className="justify-content-around">

                        <Col md={10}>
                            <Form.Group>
                                <Form.Control 
                                    type='string' 
                                    placeholder="Wyszukaj..." 
                                    value={this.state.phrase} 
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Col>

                        <Col md={1} >
                            <Button variant="primary" type="submit">
                                Wyszukaj
                            </Button>
                        </Col>

                    </Form.Row>
                     
                </Form>
            </>
        )
    }
}