import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';
import CreateForm from './create_form';
import SearchBar from './search_bar';

import { ListGroup, Col, Row, Container } from 'react-bootstrap';


export default class NotificationList extends React.Component {
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
                <CreateForm fetchPostEvents={this.fetchPostEvents}/>
                <Container fluid>
                    <SearchBar />
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