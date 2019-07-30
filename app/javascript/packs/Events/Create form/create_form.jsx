import React from 'react';
import {Button, Modal} from 'react-bootstrap';
import axios from 'axios';
import WarrningDiv from './warrning_div'

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
        descriptionError: "",
        errCategory: "",
        errImportance: "",
        errTitle: "",
        in_progress: false
      };
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const data = new FormData();
      console.log(this.state.in_progress)
      data.append('post_event[title]', this.state.title);
      data.append('post_event[description]', this.state.description);
      data.append('post_event[category]', this.state.category);
      data.append('post_event[importance]', this.state.importance);
      data.append('post_event[in_progress]', this.state.in_progress);

      if (this.state.images.length == 1)
      {
        data.append('image[]', this.state.images[0])
      }else if (this.state.images.length == 2)
      {
        data.append('image[]', this.state.images[0]);
        data.append('image[]', this.state.images[1])
      }

      axios.post("api/v1/post_events.json", data,
      {headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
      }}).then(()=>{
          this.handleClose();
          this.setState({images: '', category: '', importance: '', title: '', description: ''});

          if (this.props.fetchPostEvents)
              this.props.fetchPostEvents();
      }).catch((error) =>{
          this.setState({errTitle: error.data.title, errCategory: error.data.category, errImportance: error.data.importance});
      })
    };

    handleClose() {
      this.setState({ show: false });
    }

    handleShow() {
      this.setState({ show: true });
    }

    handleCategoryChange = (e) =>{
      this.setState({category: e.target.value})
    };

    handleImportanceChange = (e) =>{
        this.setState({importance: e.target.value})
    };

    validateDescription = () =>{
        this.setState(state => {
            return {descriptionError:
                state.description.lenght > 300 ? null : 'Opis nie może być dłuższy niż 300 znaków'}
        });
    };

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

              <WarrningDiv error={this.state.errCategory} >
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
              </WarrningDiv>

              <div>
                <label htmlFor="Title">Pilność</label>
              </div>

              <WarrningDiv error={this.state.errImportance}>
                <div className="form-check form-check-inline">
                  <input className="form-check-input"
                  type="radio" name="inlineRadioOptions2"
                  id="inlineRadio1" value="trivial"
                  onChange={this.handleImportanceChange}/>
                  <label className="form-check-label" htmlFor="inlineRadio1">Niepilne</label>
                </div>

                <div className="form-check form-check-inline">
                  <input className="form-check-input"
                  type="radio" name="inlineRadioOptions2"
                  id="inlineRadio3" value="important"
                  onChange={this.handleImportanceChange}/>
                  <label className="form-check-label" htmlFor="inlineRadio3">Pilne</label>
                </div>
              </WarrningDiv>
              <h1/>

              <div className = "form-group">
                <label htmlFor="Title">Tytuł zgłoszenia</label>
                  <WarrningDiv error={this.state.errTitle}>
                    <input type="title" className="form-control"
                    id="title" placeholder="Podaj tytuł..." maxLength="30"
                    value={this.state.title}
                    onChange={e =>{
                      this.setState({title: e.target.value})
                    }} />
                  </WarrningDiv>
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
