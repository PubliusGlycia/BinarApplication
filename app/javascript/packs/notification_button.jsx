import React from 'react';
import {Button, ListGroup, OverlayTrigger, Popover} from 'react-bootstrap';

export default class NotificationButton extends React.Component {

    state = {
        notificationList:[],
        showPopover: false
    };

    showNotificationList = () => {
        //AXIOS GET NOTIFICATIONS
    };

    render(){
        const popover = (
            <Popover id="popover-basic">
                    BLAB AB LAB LBA BLA
                BLABLSBALBLA
            </Popover>
        );

        const Example = () => (
            <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                <Button className="button-notification">🔔</Button>
            </OverlayTrigger>
        );

        const notificationList = this.state.notificationList.map(notification =>
            <ListGroup.Item key={notification.id} style={{ background: '#36372D' }}>

            </ListGroup.Item>
        );

        return (<Example />)
    }
}