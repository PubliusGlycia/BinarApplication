import React from 'react';
import ReactDOM from 'react-dom';
import NotificationList from '../notifications_list'
import { Container } from 'react-bootstrap';

class NotificationLists extends React.Component {
    fetchPostEvents = () => {
        this.setState({ isLoading: true });
        fetch("/post_events/event/defect.json")
          .then(response => response.json())
          .then(posts_events => {
            this.setState({ defects: posts_events, isLoading: false });
            });
        fetch("/post_events/event/supply.json")
            .then(response => response.json())
            .then(posts_events => {
              this.setState({ supplies: posts_events, isLoading: false });
              });
    }

    componentDidMount() {
        this.fetchPostEvents();
    }

    render() {
        return {

        }
    }
}