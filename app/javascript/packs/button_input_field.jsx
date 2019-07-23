import React from 'react';
import { Button } from 'react-bootstrap';

export default class ButtonInputField extends React.Component {
    render() {
        const { edit, onClick, value, ...rest } = this.props;

        return edit
            ? <Button
                variant="info"
                onClick={onClick}
                value={value}
                {...rest}
              />
            : <div>{value}</div>
    }
}