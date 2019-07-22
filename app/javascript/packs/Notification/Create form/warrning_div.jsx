import React from "react";

export default class WarrningDiv extends React.Component {

    render(){
        let red_div;
        let error_msg;

        if (this.props.error == 'Category need to be choosen' || this.props.error == 'Importance need to be choosen' || this.props.error == "can't be blank"){
            red_div = { border: '2px solid #FF0000', borderRadius: '5px' };
            error_msg = <p style={{color: '#FF0000'}}> {this.props.error}</p>
        }else{
            red_div= {};
            error_msg = <></>
        }

        return <div style={red_div}>
            {this.props.children}
            {error_msg}
        </div>
    }
}