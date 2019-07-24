import React from 'react';
import ReactDOM from 'react-dom';
import {Button, Overlay, Popover} from "react-bootstrap";
import axios from "axios";

export default class DeleteAcceptancePopover extends React.Component {

    state= {
        showPopover:false
    };

    handleDelete = () =>{

        axios.delete('/post_events/'+ this.props.notificationID,
            {headers: {
                    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
                }}).then(response => {
            this.props.handleClose();
        })

    };


    render() {


        return (<>
            <Button variant="danger"
                       onClick={()=> this.setState({showPopover: true})}
                       ref={(button) => { this.target = button; }}>Delete</Button>
            <Overlay
            placement="right"
            show={this.state.showPopover}
            target={ReactDOM.findDOMNode(this.target)}
            >
                <Popover title="Are you sure ? ">
                    <Button variant="success" onClick={this.handleDelete}>Yes</Button>
                    <Button variant="danger" onClick={()=> this.setState({showPopover: false})}>No</Button>
                </Popover>
            </Overlay>
        </>)
    }
}