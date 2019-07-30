import React from 'react';
import {Button, ListGroup, OverlayTrigger, Popover} from 'react-bootstrap';
import Notification from "./notification";

export default class NotificationButton extends React.Component {

    state = {
        notificationList:['content','content2','content3',
                          'content4','content5','content6',
                          'content7','content8','content9','content10'],
        showPopover: false
    };

    showNotificationList = () => {
        //AXIOS GET NOTIFICATIONS
    };

    alertClicked = () => {
        alert('You clicked item on notfification list');
    };

    render(){
        const notificationList = this.state.notificationList.map(notification =>
            <ListGroup.Item action onClick={this.alertClicked} style={{ background: '#AC9DC9' }}>
                <Notification content={notification} />
            </ListGroup.Item>
        );

        const popover = (
            <Popover id="popover-basic" style={{ background: '#AC9DC9', maxHeight: 150, overflow: 'auto'}}>
                <ListGroup variant="flush" >
                    {notificationList}
                </ListGroup>
            </Popover>
        );

        const Notifications = () => (
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <Button className="button-notification">🔔</Button>
            </OverlayTrigger>
        );

        return (<Notifications />)
    }
}