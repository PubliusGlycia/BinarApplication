import React from 'react';
import axios from "axios";
import {Button} from 'react-bootstrap';

export default class ArchiveButton extends React.Component {
    state = {
        notificationsToArchive: []
    };

    archive = () => {
        axios.post("/archive",{
                post_event_ids: this.props.notificationsToArchive
            },
            {
                headers: {
                    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
                }})
            .then(() => {
                this.setState({notificationsToArchive: ''});
                this.props.clearArchiveList();
                this.props.fetchPostEvents()
            })
    };

    render(){
        return (
            <Button variant="warning" onClick={this.archive}>Archive </Button>
        )}
}