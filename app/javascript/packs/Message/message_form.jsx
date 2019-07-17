import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import axios from 'axios';


export default class CreateForm extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
  
      this.state = {
        show: false,
        author: "",
        content: "",
        titleError: "",
        descriptionError: ""
      };
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData();

      data.append('message[author]', this.state.author)
      data.append('message[content]', this.state.content)

      axios.post("/post_events.json", data, 
      {headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      }}).then(()=>{
            this.handleClose()
            if (this.props.fetchPostEvents)
              this.props.fetchPostEvents();
      })
    }

    validateDescription = () =>{
        this.setState(state => {
            return {descriptionError:
                state.description.lenght > 200 ? null : 'Opis nie może być dłuższy niż 300 znaków'}
        });
    }

    render() {
      return (
        <>
            <Form>
                <Form.Group controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Example textarea</Form.Label>
                    <Form.Control as="textarea" rows="3" />
                </Form.Group>
            </Form>



          <Button variant="primary" onClick={this.handleShow}>
            Dodaj zgłoszenie
          </Button>
  
        </>
      );
    }
  }
  