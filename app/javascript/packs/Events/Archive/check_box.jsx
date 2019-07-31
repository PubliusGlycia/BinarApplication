
import React from 'react';

export default class ArchiveButton extends React.Component {
    state = {
        checked: false
    };

    handleCheck = (e) =>{
        let checked = !this.state.checked;
        this.setState({checked: checked});
        this.props.checkFunction(e.target.value,this.state.checked)
    };

    render(){
        return (
            <input className="form-check-input"
                   type="checkbox" name="notificationsToArchive"
                   style={{ width: '25px',
                       height:'25px',
                       borderRadius: '5px',
                       border:'2px',
                       marginTop: '25px'}}
                   value={this.props.idValue}
                   checked={this.state.checked}
                   onClick={e => e.stopPropagation()}
                   onChange={this.handleCheck}/>
        )}
}