import React from 'react';
import {Button, OverlayTrigger, Popover} from "react-bootstrap";
import axios from "axios";

export default class AcceptancePopover extends React.Component {
    handleDelete = () =>{

        axios.delete('/post_events/'+ this.props.NotificationID,
            {headers: {
                    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
                }}).then(response => {
            this.props.handleClose();
        }).catch (() =>{
            this.props.handleErrorDeleteMessage()
        });

    };

    render() {
        const popover = (
            <Popover title="You can't delete somebody else event " />
        );

        return (
            <>
                {this.props.showError
                    ? <OverlayTrigger trigger="click" placement="bottom" overlay={popover}>
                        <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
                      </OverlayTrigger>
                    : <Button variant="danger" onClick={this.handleDelete}>Delete</Button>
                }
            </>
                )}
}