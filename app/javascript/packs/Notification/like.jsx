import React from 'react';
import { Row, Button } from 'react-bootstrap';
export default class Like extends React.Component {
    state = {
        isLiked: false,
        likesCount: 0
    }

    fetchLikes = () => {

    }

    render() {
        <>
            <Row>
                <h5>{this.state.likesCount}</h5>
            </Row>
            <Row>
                <Button size="sm">Like</Button>
            </Row>
        </>
    }
}