import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';
import { FormControl, InputGroup, Button } from 'react-bootstrap';
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
        errorDescription: ""
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
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
              <Button variant="outline-secondary">Button</Button>
            </InputGroup.Append>
          </InputGroup>

{/* 
          <Button variant="primary" onClick={this.handleShow}>
            Dodaj zgłoszenie
          </Button> */}
  
        </>
      );
    }
  }
  