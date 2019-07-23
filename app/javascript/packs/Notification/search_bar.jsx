import React from 'react';
import { Form, Col } from 'react-bootstrap';

export default class SearchBar extends React.Component {
    handleChange = (e) => {
        this.props.fetchPostEventsWhenSearch(e.target.value)
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