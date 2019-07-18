import React from 'react';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';


export default class CreateForm extends React.Component {
    constructor(props, context) {
      super(props, context);
  
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

      data.append('message[author]', 'autoooooooooor')
      data.append('message[content]', this.state.content)
      data.append('message[post_event_id]', '5')

      console.log(data);

      // axios.post("/post_events.json", data, 
      // {headers: {
      //     "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      // }}).then(()=>{
      //       this.handleClose()
      //       if (this.props.fetchPostEvents)
      //         this.props.fetchPostEvents();
      // })
    }

    validateContent = () =>{
      const maxLength = 200;
      this.setState(state => {
        console.log(state.content.length);
        return {errorDescription:
            (state.content.lenght < maxLength ? '' : 'Komentarz nie może być dłuższy niż ' + maxLength + ' znaków')}
      });
      
      console.log(this.state.content.length + ' ' + this.state.errorDescription);
    }

    render() {
      return (
        <>
          <Form className="w-75">
              <Form.Group controlId="exampleForm.ControlTextarea" className="mb-0">
                <Form.Control as="textarea" placeholder="Wpisz komentarz..." rows="2"
                onChange={e =>{
                  this.setState({content: e.target.value},
                  this.validateContent())
                }} />
              </Form.Group>
              <Button className="w-100 mt-0" variant="primary" type="submit" onClick={this.handleSubmit}>
                Submit
              </Button>
          </Form>
        </>
      );
    }
  }
  