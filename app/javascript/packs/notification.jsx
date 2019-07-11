import React from 'react';

export default class Notification extends React.Component {
    importanceCheck() {
        if (this.props.importance == 'low') 
            return '!'
        else if (this.props.importance == 'medium')
            return '!!'
        else if (this.props.importance == 'high')
            return '!!!'
    }

    render() {
        return (
            <>
                <a className={this.props.isConfirmed 
                                ? 'list-group-item list-group-item-action list-group-item-success' 
                                : 'list-group-item list-group-item-action'}>
                    <div className='row'>
                        <h5 className='col-11'>{this.props.title}</h5>
                        <h1 className='col-1'>{this.importanceCheck()}</h1>
                    </div>
                    
                </a>
            </>
        )
    }
}