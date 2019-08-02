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
                this.setState({ notificationList: notifications.data.notifications })
            });
    };

    alertClicked = () => {
        alert('You clicked item on notfification list');
    };

    componentDidMount(){
        if (this.props.currentUserId) {
            this.showNotificationList();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.currentUserId !== prevProps.currentUserId) {
            this.showNotificationList();
        }
    }

    render(){

        const notificationList = this.state.notificationList.map(notification =>
            <ListGroup.Item action key={notification.id} style={{ background: '#AC9DC9' }}>
                <a href={`#${notification.post_event_id}`} className="hyperlink" >
                <Notification
                    notification_count={notification.count}
                    notification_type={notification.notification_type}
                    user_email={notification.user_email}
                    post_event_id={notification.post_event_id}/>
                </a>
            </ListGroup.Item>
        );

        const popover = (
            <Popover id="popover-basic" style={{ background: 'primary', maxHeight: 200, overflow: 'auto', background: '#AC9DC9'}}>
                <ListGroup variant="flush" style={{ overflow: "hidden", background: '#AC9DC9' }} >
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