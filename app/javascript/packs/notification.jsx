import React from 'react';
import { ListGroup, Row, Col } from 'react-bootstrap';

export default class Notification extends React.Component {
    importanceCheck() {
        if (this.props.importance == 'trivial') 
            return '!'
        else if (this.props.importance == 'important')
            return '!!!'
    }

    render() {
        return (
            <>
                <ListGroup.Item action variant={this.props.isConfirmed ? 'success' : ''}>
                    <Row>
                        <Col md={11} as='h5'>{this.props.title}</Col>
                        <Col md={1} as='h1'>{this.importanceCheck()}</Col>
                    </Row>
                </ListGroup.Item>
            </>
        )
    }
}
