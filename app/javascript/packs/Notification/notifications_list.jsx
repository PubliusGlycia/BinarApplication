import React from 'react';
import Notification from './notification';
import SearchBar from './search_bar';
import axios from 'axios'
import ArchiveButton from "./Archive/archive_button"
import {Col, Container, ListGroup, Row} from 'react-bootstrap';


export default class NotificationList extends React.Component {
    state = {
        defects: [],
        supplies: [],
        notificationsToArchive: []
    };

    fetchPostEventsWhenSearch = (phrase) => {
        axios.get('api/v1/post_events/event.json', {
            params: {
                category: 'defect',
                search_phrase: phrase
            }
        })
        .then(posts_events => {
            this.setState({ defects: posts_events.data })
        });

        axios.get('api/v1/post_events/event.json', {
            params: {
                category: 'supply',
                search_phrase: phrase
            }
        })
        .then(posts_events => {
            this.setState({ supplies: posts_events.data })
        })
    };

    fetchPostEvents = () => {
        axios.get('api/v1/post_events/event.json', {
            params: {
                category: 'defect'
            }
        })
        .then(posts_events => {
            this.setState({ defects: posts_events.data })
        });

        axios.get('api/v1/post_events/event.json', {
            params: {
                category: 'supply'
            }
        })
        .then(posts_events => {
            this.setState({ supplies: posts_events.data })
        })

    };

    componentDidMount() {
        this.fetchPostEvents();
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

    updateArchiveList = (idToArchive,save) => {

        if(save){
            this.setState(previousState => ({
                notificationsToArchive: [...previousState.notificationsToArchive, idToArchive]
            }), () => {
                console.log(this.state.notificationsToArchive)
            })
        }else{
            let tmpArray = [...this.state.notificationsToArchive];
            let index = tmpArray.indexOf(idToArchive);
            if (index !== -1) {
                tmpArray.splice(index, 1);
                this.setState({notificationsToArchive: tmpArray},
                    () => {
                    console.log(this.state.notificationsToArchive)
                });
            }
        }

    };

    clearArchiveList = () => {
        this.setState({notificationsToArchive: ''})
    };

    render() {
        const defects = this.state.defects.map(defect =>
            <ListGroup.Item key={defect.id} style={{ background: '#36372D' }}>
            <Notification
                key={defect.id}
                admin={this.props.admin}
                currentUserId={this.props.currentUserId}
                currentUserEmail={this.props.currentUserEmail}
                notificationID={defect.id}
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
        );

        const supplies = this.state.supplies.map(supply =>
            <ListGroup.Item key={supply.id} style={{ background: '#36372D' }}>
            <Notification
                key={supply.id}
                admin={this.props.admin}
                currentUserId={this.props.currentUserId}
                currentUserEmail={this.props.currentUserEmail}
                notificationID={supply.id}
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
                notificationsToArchive={this.updateArchiveList}
            />
            </ListGroup.Item>);

        return (
            <div className='body'>

                <Container fluid>
                    <Row>
                        <Col sm={8}>
                            <SearchBar fetchPostEventsWhenSearch={this.fetchPostEventsWhenSearch}/>
                        </Col>

                        <Col sm={4}>
                            <ArchiveButton
                                notificationsToArchive={this.state.notificationsToArchive}
                                fetchPostEvents={this.fetchPostEvents}
                                clearArchiveList={this.clearArchiveList}/>
                        </Col>
                    </Row>


                    <Row>

                        <Col>
                            <ListGroup.Item variant='flush' className='col_title'>
                                <h1 className='text-center'>Awarie</h1>
                            </ListGroup.Item>
                            <ListGroup variant="flush" >{defects}</ListGroup>
                        </Col>

                        <Col>
                            <ListGroup.Item variant='flush' className='col_title'>
                                <h1 className='text-center'>Zapotrzebowanie</h1>
                            </ListGroup.Item>
                            <ListGroup variant="flush" >{supplies}</ListGroup>
                        </Col>

                    </Row>
                </Container>
            </div>
        )
    }
}
