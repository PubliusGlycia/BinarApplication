import React from 'react';
import ReactDOM from 'react-dom';
import Notification from '../notification';
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
        category: "",
        importance: "",
        title: "",
        description: "",
        images: [],
        titleError: "",
        descriptionError: ""
      };
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData();

      data.append('post_event[title]', this.state.title)
      data.append('post_event[description]', this.state.description)
      data.append('post_event[category]', this.state.category)
      data.append('post_event[importance]', this.state.importance)
      
      if (this.state.images.length == 1)
      {
        data.append('image[]', this.state.images[0])
      }else if (this.state.images.length == 2)
      {
        data.append('image[]', this.state.images[0])
        data.append('image[]', this.state.images[1])
      }
      
      axios.post("/post_events.json", data, 
      {headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      }}).then(()=>{
            this.handleClose()
            if (this.props.fetchPostEvents)
              this.props.fetchPostEvents();
      })
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: true });
    }
  
    handleCategoryChange = (e) =>{
      this.setState({category: e.target.value})
    }

    handleImportanceChange = (e) =>{
        this.setState({importance: e.target.value})
    }

    validateTitle = () =>{
      this.setState(state => {
          return {titleError:
              state.title.lenght > 30 ? null : 'Tytuł nie może być dłuższy niż 30 znaków'}
      });
    }

    validateDescription = () =>{
        this.setState(state => {
            return {descriptionError:
                state.description.lenght > 300 ? null : 'Opis nie może być dłuższy niż 300 znaków'}
        });
    }
    render() {
      return (
        <>
          <Button variant="primary" onClick={this.handleShow}>
            Dodaj zgłoszenie
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Formularz zgłoszeniowy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form >

              <div>
                <label htmlFor="Title">Kategoria zgłoszenia</label>
              </div>

              <div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" 
                  type="radio" name="inlineRadioOptions1" 
                  id="inlineRadio1" value="defect" 
                  onChange={this.handleCategoryChange}/>
                  <label className="form-check-label" htmlFor="inlineRadio1">Awaria</label>
                </div>

                <div className="form-check form-check-inline">
                  <input className="form-check-input" 
                  type="radio" name="inlineRadioOptions1" 
                  id="inlineRadio2" value="supply" 
                  onChange={this.handleCategoryChange}/>
                  <label className="form-check-label" htmlFor="inlineRadio2">Zakupy</label>
                </div>

                <div className="form-check form-check-inline">
                  <input className="form-check-input" 
                  type="radio" name="inlineRadioOptions1" 
                  id="inlineRadio3" value="others" 
                  onChange={this.handleCategoryChange}/>
                  <label className="form-check-label" htmlFor="inlineRadio2">Inne</label>
                </div>
              </div>

              <div>
                <label htmlFor="Title">Pilność</label>
              </div>

              <div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" 
                  type="radio" name="inlineRadioOptions2" 
                  id="inlineRadio1" value="trivial" 
                  onChange={this.handleImportanceChange}/>
                  <label className="form-check-label" htmlFor="inlineRadio1">Trivial</label>
                </div>

                <div className="form-check form-check-inline">
                  <input className="form-check-input" 
                  type="radio" name="inlineRadioOptions2" 
                  id="inlineRadio3" value="important" 
                  onChange={this.handleImportanceChange}/>
                  <label className="form-check-label" htmlFor="inlineRadio3">Important</label>
                </div>
              </div>

              <div className = "form-group">
                <label htmlFor="Title">Tytuł zgłoszenia</label>
                <input type="title" className="form-control" 
                id="title" placeholder="Podaj tytuł..." maxLength="30"
                value={this.state.title}
                onChange={e =>{
                  this.setState({title: e.target.value},
                  this.validateTitle())
                }} />
              </div>

              <div className = "form-group">
                <label htmlFor="description">Opis zgłoszenia</label>
                <textarea className="form-control" 
                id="description" rows="3" maxLength="300"
                value={this.state.description}
                    onChange={e =>{
                        this.setState({description: e.target.value},
                        this.validateDescription())
                }}></textarea>
              </div>

              <div className= "form-group">
                <label htmlFor="fileControl">Załącznik (.jpg/.png)</label>
                <input type="file" className="form-control-file" 
                id="fileControl" accept=".jpeg,.png,.jpg" 
                multiple="multiple"
                    onChange={e =>{
                        this.setState({images: e.target.files})
                    }}
                />
              </div>

            </form>

          </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Zamknij
              </Button>
              <Button variant="primary" onClick={this.handleSubmit}>
                Wyślij
              </Button>
            </Modal.Footer>

          </Modal>
        </>
      );
    }
  }
  