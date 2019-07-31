import React from 'react';
import {Button, Overlay, Popover} from "react-bootstrap";
import axios from "axios";

export default class ProcessAcceptancePopover extends React.Component {

    state= {
        showPopover:false
    };

    handleProcess = (e) => {
        e.stopPropagation()
        const data = new FormData();
        console.log(this.props.in_progress)
        let newin_progress;

        if(this.props.in_progress == false){
            newin_progress= false;
        }else{
            newin_progress= true;

        }
        this.props.setProgress(newin_progress)

        data.append('post_event[in_progress]', newin_progress)
        axios.patch("api/v1/post_events/"+this.props.notificationID + '.json', data,
            {headers: {
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
            }}).then(()=>{
                this.handleClose()
            })
      }


    render() {


        return (<>
            <Button variant="secondary" className="button-success w-100"
                       onClick={()=> this.setState({showPopover: true})}
                       ref={(button) => { this.target = button; }}>Usuń</Button>
            <Overlay
            placement="right"
            show={this.state.showPopover}
            target={this.target}
            >
                <Popover title="Na pewno? ">
                    <Button variant="success" onClick={this.handleProcess}>Tak</Button>
                    <Button variant="danger" onClick={()=> this.setState({showPopover: false})}>Nie</Button>
                </Popover>
            </Overlay>
        </>)
    }
}