import React from 'react';

export default class AreaInputField extends React.Component {
    render() {
        const { edit, value, ...rest } = this.props;

        return edit
                ? <textarea value={value} {...rest} />
                : <div>{value}</div>
    }
}