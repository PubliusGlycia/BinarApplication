import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';
import CreateForm from './create_form';
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



    componentDidMount() {
        this.fetchPostEvents();
    }

    render() {
        const defects = this.state.defects.map(defect => {
            console.log(defect)
            return <Notification
                key={defect.id}
                NotificationID={defect.id}
                title={defect.title}
                importance={defect.importance}
                isConfirmed={defect.isConfirmed}
                description={defect.description}
                date={defect.created_at}
                category={defect.category}
                images={defect.images}
                user_id={defect.user_id}
                fetchPostEvents={this.fetchPostEvents}
            />})



        const supplies = this.state.supplies.map(supply =>
            <Notification
                key={supply.id}
                NotificationID={supply.id}
                title={supply.title}
                importance={supply.importance}
                isConfirmed={supply.isConfirmed}
                description={supply.description}
                date={supply.created_at}
                category={supply.category}
                images={supply.images}
                user_id={supply.user_id}
                fetchPostEvents={this.fetchPostEvents}
            />)

        return (
            <>
                <Navbar fetchPostEvents={this.fetchPostEvents} admin={true} />

                <Container fluid>
                    <Row>

                        <Col>
                            <ListGroup.Item variant='secondary'>
                                <h1 className='text-center'>Awarie</h1>
                            </ListGroup.Item>
                            {this.state.isLoading
                            ? "loading"
                            : <ListGroup>{defects}</ListGroup>}

                        </Col>

                        <Col>
                            <ListGroup.Item variant='secondary'>
                                <h1 className='text-center'>Zapotrzebowanie</h1>
                            </ListGroup.Item>
                            {this.state.isLoading
                                ? "loading"
                                : <ListGroup>{supplies}</ListGroup>}
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