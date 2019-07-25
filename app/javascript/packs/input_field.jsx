import React from 'react';

export default class InputField extends React.Component {
    render() {
        return this.props.edit
            ?  (<input
                  onChange={this.props.onChange}
                  type={this.props.type}
                  value={this.props.value}
                />)
            : <div>{this.props.value}</div>
    }
}