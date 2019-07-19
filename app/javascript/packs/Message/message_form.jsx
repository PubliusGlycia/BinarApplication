import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


export default class CreateForm extends React.Component {
    constructor(props, context) {
      super(props, context);
  
      this.state = {
        maxLength: 200,
        show: false,
        author: "default_author",
        content: "default_content",
        postID: "5",
        errorDescription: ""
      };
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData();

      data.append('message[author]', this.state.author)
      data.append('message[content]', this.state.content)
      data.append('message[post_event_id]', this.state.postID)

      axios.post("/messages.json", data, 
      {headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      }})
    }

    validateContent = () =>{
      
      this.setState(state => {
        console.log(state.content.length);
        return {errorDescription:
            (state.content.length < this.state.maxLength ? '' : 'Komentarz nie może być dłuższy niż ' + this.state.maxLength + ' znaków')}
      });
      
      console.log(this.state.content.length + ' ' + this.state.errorDescription);
    }

    render() {
      return (     
        <>
          <Form className="w-75">
              <Form.Group controlId="exampleForm.ControlTextarea" className="mb-0">
                <Form.Control as="textarea" placeholder="Wpisz komentarz..." rows="2" style={ this.state.errorDescription ? { borderColor: '#ACF231' } : {} }
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
  