import React from 'react';

export default class ShoppingListButton extends React.Component {
    getParams = () => {
        if(this.props.notificationsToShopping)
            return this.props.notificationsToShopping.map(id => `post_event_ids[]=${id}`).join('&')
    }

    render() {
        return (
            <a className='btn btn-primary' target='_blank' href={`shopping_list.pdf?${this.getParams()}`}>PDF</a>
        )
    }
}