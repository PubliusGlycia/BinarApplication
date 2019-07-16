import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';
import CreateForm from './create_form';
import axios from 'axios';
import Navbar from "../navbar";


import { ListGroup, Col, Row, Container } from 'react-bootstrap';

export default class NotificationList extends React.Component {
    state = {
        defects: [],
        supplies: [],
        isLoading: false,
        state: ''
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
    };

    handleDelete = (e) =>{
        axios.delete('/post_events/'+ 14,
        {headers: {
            "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content
        }}).then(response => {
                    console.log('Deleted post with id: ');
                    this.fetchPostEvents();
                  });

      }

    componentDidMount() {
        this.fetchPostEvents();
    }

    render() {
        const defects = this.state.defects.map(defect => {
            console.log(defect)
            return <Notification
                key={defect.id}
                title={defect.title}
                importance={defect.importance}
                isConfirmed={defect.isConfirmed}
                description={defect.description}
                date={defect.created_at}
                category={defect.category}
                images={defect.images}
            />})
        
            
        
        const supplies = this.state.supplies.map(supply =>
            <Notification
                key={supply.id}
                title={supply.title}
                importance={supply.importance}
                isConfirmed={supply.isConfirmed}
                description={supply.description}
                date={supply.created_at}
                category={supply.category}
                images={supply.images}
            />)

        return (
            <>
                <Navbar fetchPostEvents={this.fetchPostEvents} admin={true} />

                <CreateForm fetchPostEvents={this.fetchPostEvents}/>

        <button variant="primary" onClick={this.handleDelete}>
            Usuń zgłoszenie
          </button>
                <Container fluid>
                    <Row>

                        <Col>
                            <ListGroup.Item variant='secondary'>
                                <h1 className='text-center'>Awarie</h1>
                            </ListGroup.Item>
                            <ListGroup>
                                {defects}
                            </ListGroup>
                        </Col>

                        <Col>
                            <ListGroup.Item variant='secondary'>
                                <h1 className='text-center'>Zapotrzebowanie</h1>
                            </ListGroup.Item>
                            <ListGroup>
                                {supplies}
                            </ListGroup>
                        </Col>

                    </Row>
                </Container>  
            </>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      < NotificationList />,
      document.body.appendChild(document.createElement('div')),
    )
  })