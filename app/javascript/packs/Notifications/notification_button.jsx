import React from 'react';
import {Button, ListGroup, OverlayTrigger, Popover} from 'react-bootstrap';
import Notification from "./notification";
import axios from 'axios';

export default class NotificationButton extends React.Component {

    state = {
        notificationList:[],
        showPopover:false
    };

    componentDidMount(){
        this.showNotificationList()
    }

    showNotificationList = () => {
        axios.get('api/v1/notifications_per_user/4.json')
            .then(notifications => {
                this.setState({ notificationList: notifications.data.notifications })
            });
    };

    alertClicked = () => {
        alert('You clicked item on notfification list');
    };

    render(){
        const notificationList = this.state.notificationList.map(notification =>
            <ListGroup.Item action onClick={this.alertClicked} style={{ background: '#AC9DC9' }}>
                <Notification content={notification.notification_type} />
            </ListGroup.Item>
        );

        const popover = (
            <Popover id="popover-basic" style={{ background: '#AC9DC9', maxHeight: 150, overflow: 'auto'}}>
                <ListGroup variant="flush" >
                    {notificationList}
                </ListGroup>
            </Popover>
        );

        const NotificationPopout = () => (
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover} rootClose={true}>
                <Button className="button-notification">🔔</Button>
            </OverlayTrigger>
        );

        return <NotificationPopout />
    }
}