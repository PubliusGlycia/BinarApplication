import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';
import { Modal } from 'react-bootstrap';
import { Button } from 'react-bootstrap';

export default class CreateForm extends React.Component {
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
            Dodaj zgłoszenie
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Formularz zgłoszeniowy</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <form>

                <div>
                <label htmlFor="Title">Kategoria zgłoszenia</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" defaultChecked />

                <label className="form-check-label" htmlFor="inlineRadio1">Awaria</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label className="form-check-label" htmlFor="inlineRadio2">Zakupy</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="option3" />
                <label className="form-check-label" htmlFor="inlineRadio2">Inne</label>
                </div>

                <div>
                <label htmlFor="Title">Pilność</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" defaultChecked />
                <label className="form-check-label" htmlFor="inlineRadio1">Low</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                <label className="form-check-label" htmlFor="inlineRadio2">Medium</label>
                </div>
                <div className="form-check form-check-inline">
                <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option3" />
                <label className="form-check-label" htmlFor="inlineRadio3">High</label>
                </div>

                <div className = "form-group">
                <label htmlFor="Title">Tytuł zgłoszenia</label>
                <input type="title" className="form-control" id="title" placeholder="Podaj tytuł..." maxLength="30" />
                </div>

                <div className = "form-group">
                <label htmlFor="description">Opis zgłoszenia</label>
                <textarea className="form-control" id="description" rows="3" maxLength="300"></textarea>
                </div>

                <div className= "form-group">
                <label htmlFor="fileControl">Załącznik (.jpg/.png)</label>
                <input type="file" className="form-control-file" id="fileControl" accept=".jpg,.png" />
                </div>

            </form>

            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>
                Zamknij
              </Button>
              <Button variant="primary" onClick={this.handleClose}>
                Wyślij
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
  }
  