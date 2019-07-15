import React from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default class SearchBar extends React.Component {
    render() {
        return (
            <>
                <Row>
                    <Form>
                        <Col>
                            <Form.Control type='string' placeholder="Wyszukaj..."/>
                        </Col>
                        <Col>
                            <Button variant="primary" type="submit">
                                Wyszukaj
                            </Button>
                        </Col>
                    </Form>
                </Row>
                
            </>
        )
    }
}