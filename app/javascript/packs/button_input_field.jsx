import React from 'react';
import { Button } from 'react-bootstrap';

export default class ButtonInputField extends React.Component {
    render() {
        const { edit, onClick, value, variant, ...rest } = this.props;

        return edit
            ? <Button
                variant={variant}
                onClick={onClick}
                value={value}
                {...rest}
              />
            : <div>{value}</div>
    }
}