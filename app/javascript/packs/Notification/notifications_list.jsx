import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';
import SearchBar from './search_bar';
import axios from 'axios'
import Navbar from "../navbar";


import {Button, Col, Container, ListGroup, Row} from 'react-bootstrap';


export default class NotificationList extends React.Component {
    state = {
        defects: [],
        supplies: [],
        isLoading: false,
        state: '',
        admin: false,
        notificationsToArchive: []
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
        });

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
        });

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
        this.checkUser()
    }

    checkUser() {
        axios.get('/user/check')
            .then(response =>{
                if (response.status == 202){
                    this.setState({admin: true})
                }
            })
            .catch (function (error){
                console.log(error.response.status);
                this.setState({admin: false})
        })
    }

    updateDefectElement = (defect, key, value) => {
        this.setState({defects: this.state.defects.map(index => {
            if(index.id === defect.id) {
                return {...index, [key]: value}
            } else {
                return index;
            }
        })})
    };

    updateSupplyElement = (supply, key, value) => {
        this.setState({supplies: this.state.supplies.map(index => {
            if(index.id === supply.id) {
                return {...index, [key]: value}
            } else {
                return index;
            }
        })})
    };

    updateArchiveList = (idToArchive) => {

        this.setState(previousState => ({
            notificationsToArchive: [...previousState.notificationsToArchive, idToArchive]
        }), () => {
            console.log(this.state.notificationsToArchive)
        })
    };

    archive(){

    }

    render() {
        const defects = this.state.defects.map(defect => {
            return <ListGroup.Item style={{ background: '#36372D' }}>
            <Notification
                key={defect.id}
                admin={this.props.admin}
                NotificationID={defect.id}
                title={defect.title}
                setTitle={title => {this.updateDefectElement(defect, 'title', title)}}
                importance={defect.importance}
                setImportance={importance => {this.updateDefectElement(defect, 'importance', importance)}}
                isConfirmed={defect.isConfirmed}
                description={defect.description}
                setDescription={description => {this.updateDefectElement(defect, 'description', description)}}
                date={defect.created_at}
                category={defect.category}
                images={defect.images}
                setImages={images => {this.updateDefectElement(defect, 'images', images)}}
                user_id={defect.user_id}
                fetchPostEvents={this.fetchPostEvents}
                notificationsToArchive={this.updateArchiveList}
            />
            </ListGroup.Item>
        });



        const supplies = this.state.supplies.map(supply =>
            <ListGroup.Item style={{ background: '#36372D' }}>
            <Notification
                key={supply.id}
                admin={this.props.admin}
                NotificationID={supply.id}
                title={supply.title}
                setTitle={title => {this.updateSupplyElement(supply, 'title', title)}}
                importance={supply.importance}
                setImportance={importance => {this.updateSupplyElement(supply, 'importance', importance)}}
                isConfirmed={supply.isConfirmed}
                description={supply.description}
                setDescription={description => {this.updateSupplyElement(supply, 'description', description)}}
                date={supply.created_at}
                category={supply.category}
                images={supply.images}
                setImages={images => {this.updateSupplyElement(supply, 'images', images)}}
                user_id={supply.user_id}
                fetchPostEvents={this.fetchPostEvents}
            />
            </ListGroup.Item>);

        return (
            <div className='body'>
                <Navbar fetchPostEvents={this.fetchPostEvents} admin={true} />

                <Container fluid>
                    <Row>
                        <Col sm={8}>
                            <SearchBar fetchPostEventsWhenSearch={this.fetchPostEventsWhenSearch}/>
                        </Col>

                        <Col sm={4}>
                            <Button variant="secondary" onClick={this.archive}>
                                Archive
                            </Button>
                        </Col>
                    </Row>


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