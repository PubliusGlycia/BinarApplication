import React from 'react';
import {Col, Form} from 'react-bootstrap';

export default class SearchBar extends React.Component {
    handleChange = (e) => {
        this.props.fetchPostEventsWhenSearch(e.target.value)
    };

    render() {
        return (
            <>
                <Form>
                    <Form.Row >

                        <Col md={10}>
                            <Form.Group>
                                <Form.Control 
                                    type='string' 
                                    placeholder="Wyszukaj..." 
                                    onChange={this.handleChange}
                                />
                            </Form.Group>
                        </Col>

                    </Form.Row>
                     
                </Form>
            </>
        )
    }
}