import React from 'react';
import { Row, Button } from 'react-bootstrap';
import axios from 'axios';

export default class InProgress extends React.Component {
    state = {
        isClicked: false,
    }

    handleProcess = (e) => {
        e.stopPropagation()
        console.log(this.props.inprogress)
        this.setState(isClicked => {
            if(this.props.inprogress == true){
                this.props.setProgress(false)
            }else{
                this.props.setProgress(true)
            }
        })
        axios.patch("api/v1/post_events/"+this.props.notificationID + '.json', data,
            {headers: {
                "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
            }}).then(()=>{
                this.handleClose()
            })
    }

    render () {
        let ProcessButton;
        let procText = this.state.inprogress ? 'success' : 'outline-success';

        if(this.props.currentUserId == this.props.user_id)
        {
            ProcessButton =  <Button variant={procText} onClick={this.handleProcess} > ✅ </Button>
        }
        return (
            <>
                <Row>
                    {ProcessButton}
                </Row>
            </>
        )
    }
}