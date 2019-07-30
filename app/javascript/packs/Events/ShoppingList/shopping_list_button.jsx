import React from 'react';

export default class ShoppingListButton extends React.Component {
    getParams = () => {
        return this.props.notificationsToShopping.map(id => `post_event_ids[]=${id}`).join('&')
    }

    render() {
        return (
            <a className='btn btn-warning' target='_blank' href={`shopping_list.pdf?${this.getParams()}`}>Generuj PDF</a>
        )
    }
}