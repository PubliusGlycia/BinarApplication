import React from 'react';
import { Row, Button } from 'react-bootstrap';
import axios from 'axios';
export default class Like extends React.Component {
    state = {
        isLiked: false,
        likesCount: 0,
        likeID: null
    }

    fetchLikes = () => {
        axios.get(`/post_events/${this.props.notificationID}/likes.json`, {
        })
        .then(likes => {
            console.log(likes);
            this.setState({
                isLiked: likes.data.already_liked,
                likesCount: likes.data.likes_count,
                likeID: likes.data.id
            })
        });
    }

    componentDidMount() {
        this.fetchLikes();
    }

    handleClick = () => {

        if (this.state.isLiked) {
            axios.delete(`/post_events/${this.props.notificationID}/likes/${this.state.likeID}`,
            {headers: {
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
            }}).then( this.fetchLikes() )

        } else {
            let data = { post_event_id: this.props.notificationID };
            axios.post(`/post_events/${this.props.notificationID}/likes`, data,
            {headers: {
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
            }}).then( this.fetchLikes() )
        }
    }

    render() {
        return (
            <>
                <Row>
                    <h5>{this.state.likesCount}</h5>
                </Row>
                <Row>
                        <Button
                          as="input"
                          size="sm"
                          type="submit"
                          value="Like"
                          onClick={this.handleClick}
                        />
                </Row>
            </>
        )

    }
}