import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';
import CreateForm from './create_form';
import SearchBar from './search_bar';
import axios from 'axios'
import Navbar from "../navbar";


import { ListGroup, Col, Row, Container } from 'react-bootstrap';


export default class NotificationList extends React.Component {
    state = {
        defects: [],
        supplies: [],
        isLoading: false,
        state: ''
    };

    fetchPostEventsWhenSearch = (phrase) => {
        this.setState({ isLoading: true });
        axios.get('/post_events/event.json', {
            params: {
                category: 'defect',
                search_phrase: phrase
            }
        })
        .then(posts_events => {
            this.setState({ defects: posts_events.data, isLoading: false })
        })

        axios.get('/post_events/event.json', {
            params: {
                category: 'supply',
                search_phrase: phrase
            }
        })
        .then(posts_events => {
            this.setState({ supplies: posts_events.data, isLoading: false })
        })
    };

    fetchPostEvents = () => {
        this.setState({ isLoading: true });
        
        axios.get('/post_events/event.json', {
            params: {
                category: 'defect'
            }
        })
        .then(posts_events => {
            this.setState({ defects: posts_events.data, isLoading: false })
        })

        axios.get('/post_events/event.json', {
            params: {
                category: 'supply'
            }
        })
        .then(posts_events => {
            this.setState({ supplies: posts_events.data, isLoading: false })
        })

    };



    componentDidMount() {
        this.fetchPostEvents();
    }

    render() {
        const defects = this.state.defects.map(defect => {
            return <ListGroup.Item style={{ background: '#36372D' }}>
            <Notification
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
            />
            </ListGroup.Item>
        });



        const supplies = this.state.supplies.map(supply =>
            <ListGroup.Item style={{ background: '#36372D' }}>
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
            />
            </ListGroup.Item>);

        return (
            <div className='body'>
                <Navbar fetchPostEvents={this.fetchPostEvents} admin={true} />

                <Container fluid>
                    <SearchBar fetchPostEventsWhenSearch={this.fetchPostEventsWhenSearch}/>
                    <Row>

                        <Col>
                            <ListGroup.Item variant='flush' className='col_title'>
                                <h1 className='text-center'>Awarie</h1>
                            </ListGroup.Item>
                            {this.state.isLoading
                            ? "loading"
                            : <ListGroup variant="flush" >{defects}</ListGroup>}

                        </Col>

                        <Col>
                            <ListGroup.Item variant='flush' className='col_title'>
                                <h1 className='text-center'>Zapotrzebowanie</h1>
                            </ListGroup.Item>
                            {this.state.isLoading
                                ? "loading"
                                : <ListGroup variant="flush" >{supplies}</ListGroup>}
                        </Col>

                    </Row>
                </Container>  
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
      < NotificationList />,
      document.body.appendChild(document.createElement('div')),
    )
  });