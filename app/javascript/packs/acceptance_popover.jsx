import React from 'react';
import {Button, OverlayTrigger, Popover} from "react-bootstrap";

export default class AcceptancePopover extends React.Component {


    render() {
        const popover = (
            <Popover title="Are you sure ? ">
                <Button variant="success">Yes</Button>
                <Button variant="success">No</Button>
            </Popover>
        );

        const Example = () => (
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <Button variant="success">Click</Button>
            </OverlayTrigger>
        );

        return <Example/>
    }
}