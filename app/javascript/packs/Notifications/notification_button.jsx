import React from 'react';
import {Button, ListGroup, OverlayTrigger, Popover} from 'react-bootstrap';
import Notification from "./notification";
import axios from 'axios';

export default class NotificationButton extends React.Component {

    state = {
        notificationList:[],
        showPopover:false,
        userMail:''
    };

    showNotificationList = () => {
        axios.get('api/v1/notifications_per_user/'+this.props.currentUserId+'.json')
            .then(notifications => {
                this.setState({ notificationList: notifications.data.notifications, userMail: notifications.data.email })
            });
    };

    alertClicked = () => {
        alert('You clicked item on notfification list');
    };

    componentDidUpdate(prevProps) {
        if (this.props.currentUserId !== prevProps.currentUserId) {
            this.showNotificationList();
        }
    }

    render(){

        const notificationList = this.state.notificationList.map(notification =>
            <ListGroup.Item action onClick={this.alertClicked} key={notification.id} style={{ background: '#AC9DC9' }}>
                <Notification
                    notification_count={notification.count}
                    notification_type={notification.notification_type}
                    user_email={this.state.userMail}
                    post_event_id={notification.post_event_id}/>
            </ListGroup.Item>
        );

        const popover = (
            <Popover id="popover-basic" style={{ background: '#AC9DC9', maxHeight: 200, overflow: 'auto'}}>
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