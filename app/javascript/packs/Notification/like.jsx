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
        axios.get(`/api/v1/post_events/${this.props.notificationID}/likes.json`, {
        })
        .then(likes => {
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

    handleClick = (e) => {
        e.stopPropagation()
        if (this.state.isLiked) {
            axios.delete(`/api/v1/post_events/${this.props.notificationID}/likes/${this.state.likeID}`,
            {headers: {
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
            }}).then( this.fetchLikes() )

        } else {
            let data = { post_event_id: this.props.notificationID };
            axios.post(`/api/v1/post_events/${this.props.notificationID}/likes`, data,
            {headers: {
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
            }}).then( this.fetchLikes() )
        }
        this.fetchLikes()
    }

    render() {
        let buttonText = `👍 ${this.state.likesCount}`
        let buttonVariant = this.state.isLiked ? 'primary' : 'outline-primary';
        return (
            <>
                <Row>
                    <Button
                      as="input"
                      size="sm"
                      type="submit"
                      value={buttonText}
                      variant={buttonVariant}
                      onClick={this.handleClick}
                    />
                </Row>
            </>
        )

    }
}