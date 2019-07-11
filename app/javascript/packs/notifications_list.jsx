import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';
import axios from 'axios-on-rails'

import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

class NotificationList extends React.Component {
    state = {
        defects: [],
        supplies: [],
        isLoading: false
    }

    fetchPostEvents = () => {
        this.setState({ isLoading: true });
        fetch("/post_events/event/defect.json")
          .then(response => response.json())
          .then(posts_events => {
            this.setState({ defects: posts_events, isLoading: false });
            });
        fetch("/post_events/event/supply.json")
            .then(response => response.json())
            .then(posts_events => {
              this.setState({ supplies: posts_events, isLoading: false });
              });
        // axios.get('/post_event', {
        //     params: {
        //         category: 'defect'
        //     }})
        //     .then(response => response.json())
        //     .then(post_events => {
        //         this.setState({ defects: post_events, isLoading: false});
        //     });

    };

    componentDidMount() {
        this.fetchPostEvents();
    }
    render() {
        const defects = this.state.defects.map(defect => {
            console.log(defect)
            return <Notification key={defect.id} title={defect.title} importance={defect.importance} isConfirmed={defect.isConfirmed}/>})
        
            
        
        const supplies = this.state.supplies.map(supply =>
            <Notification key={supply.id} title={supply.title} importance={supply.importance} isConfirmed={supply.isConfirmed}/>)
            
        return (
            <>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col'>

                            <div className='list-group'>
                                <div className='list-group-item list-group-item-secondary'><h1 className='text-center'>Awarie</h1></div> 
                                {defects}
                            </div>
                        </div>
                            
                        <div className='col'>
                            <div className='list-group'>
                                <div className='list-group-item list-group-item-secondary'><h1 className='text-center'>Zapotrzebowanie</h1></div> 
                                {supplies}
                            </div>
                        </div>
                    </div>
                </div>  
            </>
        )
    }
}

class Example extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false,
      };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    render() {
      return (
        <>
          <Button variant="primary" onClick={this.handleShow}>
            Launch demo modal
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      < Example />,
      document.body.appendChild(document.createElement('div')),
    )
  })