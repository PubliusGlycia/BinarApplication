import React from 'react';
import axios from "axios";
import { Button } from 'react-bootstrap';

export default class ShoppingListButton extends React.Component {
    state = {
        notificationsToShopping: []
    };

    generatePDF = () => {
        axios.post("api/v1/shopping_list", {
            post_event_ids: this.props.notificationsToShopping
        },
            {
                headers: {
                    "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
                }
            })
            .then(() => {
                this.setState({ notificationsToShopping: '' });
                this.props.fetchPostEvents()
            })
    };

    render() {
        return (
            <Button variant="warning" onClick={this.generatePDF}>Generuj PDF</Button>
        )
    }
}