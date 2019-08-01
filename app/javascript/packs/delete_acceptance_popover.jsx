import React from 'react';
import {Button, Overlay, Popover} from "react-bootstrap";
import axios from "axios";

export default class DeleteAcceptancePopover extends React.Component {

    button = React.createRef();

    state= {
        showPopover:false
    };

    handleDelete = () =>{

        axios.delete('api/v1/post_events/'+ this.props.notificationID,
            {headers: {
                    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
                }}).then(response => {
            this.props.handleClose();
        })

    };


    render() {


        return (<>
            <Button variant="secondary" className="button-delete w-100"
                       onClick={()=> this.setState({showPopover: true})}
                       ref={(button) => { this.target = button; }}>Usuń</Button>
            <Overlay
                placement="right"
                show={this.state.showPopover}
                target={this.target}
            >
                <Popover title="Na pewno? ">
                    <Button variant="success" onClick={this.handleDelete}>Tak</Button>
                    <Button variant="danger" onClick={()=> this.setState({showPopover: false})}>Nie</Button>
                </Popover>
            </Overlay>
        </>)
    }
}