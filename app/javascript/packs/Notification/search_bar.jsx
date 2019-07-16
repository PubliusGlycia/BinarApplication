import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default class SearchBar extends React.Component {
    render() {
        return (
            <>
                    <Form>
                        <Form.Row className="justify-content-around">

                            <Col md={10}>
                                <Form.Group>
                                    <Form.Control type='string' placeholder="Wyszukaj..."/>
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