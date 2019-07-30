import React from 'react';
import axios from "axios";
import { Button } from 'react-bootstrap';

export default class ShoppingListButton extends React.Component {
    state = {
        url: 'api/v1/shopping_list.pdf'
    };

    generatePDF = () => {
        let url = 'api/v1/shopping_list.pdf?';
        if (this.props.post_event_ids) {
            this.props.post_event_ids.foreach(post_event_id => {
                url = url + `post_event_ids[]=${post_event_id}&`
            })
        }
        this.setState({url: url})
    }

    render() {

        return (
            <a className='btn btn-warning' target='_blank' href={this.state.url}>Generuj</a>
            // <Button variant="warning" onClick={this.generatePDF}>Generuj PDF</Button>
        )
    }
}