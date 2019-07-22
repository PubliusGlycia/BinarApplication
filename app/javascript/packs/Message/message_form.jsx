import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


export default class CreateForm extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        maxLength: 200,
        show: false,
        content: "",
        postID: this.props.notifID,
        errorDescription: ""
      };
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData();

      data.append('message[content]', this.state.content)
      data.append('message[post_event_id]', this.state.postID)

      axios.post("/messages.json", data, 
      {headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      }}).then(() =>
        this.props.fetchMessages()
      ).then(() =>
        document.getElementById('textarea').value = ''
      )
    }

    validateContent = () =>{
      
      this.setState(state => {
        return {errorDescription:
            (state.content.length < this.state.maxLength ? '' : 'Komentarz nie może być dłuższy niż ' + this.state.maxLength + ' znaków')}
      });
    }

    render() {
      return (
        <>
          <Form className="w-75">
              <Form.Group controlId="exampleForm.ControlTextarea" className="mb-0">
                <Form.Control id="textarea" as="textarea" placeholder="Wpisz komentarz..." rows="2" style={ this.state.errorDescription ? { borderColor: '#f23131'} : {} }
                onChange={e =>{
                  this.setState({content: e.target.value},
                  this.validateContent())
                }} />
              </Form.Group>
              <Button className="w-100 mt-0" variant="primary" type="submit" onClick={this.handleSubmit}>
                Dodaj komentarz
              </Button>
          </Form>
        </>
      );
    }
  }
  