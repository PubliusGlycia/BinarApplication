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
        return (
            <>
                <Row>
                    <p>{this.state.likesCount}</p>
                </Row>
                <Row>
                    {this.state.isLiked
                      ? <Button
                          as="input"
                          size="sm"
                          type="submit"
                          value="Unlike"
                          variant="outline-primary"
                          onClick={this.handleClick}
                        />
                      : <Button
                          as="input"
                          size="sm"
                          type="submit"
                          value=" Like "
                          onClick={this.handleClick}
                    />}
                </Row>
            </>
        )

    }
}