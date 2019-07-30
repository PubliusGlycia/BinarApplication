import React from 'react';
import Event from './event';
import SearchBar from './search_bar';
import axios from 'axios'
import ArchiveButton from "./Archive/archive_button"
import ShoppingListButton from './ShoppingList/shopping_list_button'
import {Col, Container, ListGroup, Row} from 'react-bootstrap';
import NotificationButton from '../notification_button';


export default class AdminView extends React.Component {
    state = {
        defects: [],
        supplies: [],
        others: [],
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
            });

        axios.get('api/v1/post_events/event.json', {
            params: {
                category: 'others',
                search_phrase: phrase
            }
        })
            .then(posts_events => {
                this.setState({ others: posts_events.data })
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
            });

        axios.get('api/v1/post_events/event.json', {
            params: {
                category: 'others'
            }
        })
            .then(posts_events => {
                this.setState({ others: posts_events.data })
            })

    };

    componentDidMount() {
        this.fetchPostEvents();
    }

    updateDefectElement = (defect, key, value) => {
        this.setState({
            defects: this.state.defects.map(index => {
                if (index.id === defect.id) {
                    return { ...index, [key]: value }
                } else {
                    return index;
                }
            })
        })
    };

    updateSupplyElement = (supply, key, value) => {
        this.setState({
            supplies: this.state.supplies.map(index => {
                if (index.id === supply.id) {
                    return { ...index, [key]: value }
                } else {
                    return index;
                }
            })
        })
    };

    updateOtherElement = (other, key, value) => {
        this.setState({
            others: this.state.others.map(index => {
                if (index.id === other.id) {
                    return { ...index, [key]: value }
                } else {
                    return index;
                }
            })
        })
    };

    updateArchiveList = (idToArchive, save) => {

        if (save) {
            this.setState(previousState => ({
                notificationsToArchive: [...previousState.notificationsToArchive, idToArchive]
            }))
        } else {
            let tmpArray = [...this.state.notificationsToArchive];
            let index = tmpArray.indexOf(idToArchive);
            if (index !== -1) {
                tmpArray.splice(index, 1);
                this.setState({ notificationsToArchive: tmpArray }
                );
            }
        }

    };

    clearArchiveList = () => {
        this.setState({ notificationsToArchive: '' })
    };

    render() {
        const defects = this.state.defects.map(defect =>
            <ListGroup.Item key={defect.id} style={{ background: '#36372D' }}>
                <Event
                    key={defect.id}
                    admin={this.props.admin}
                    currentUserId={this.props.currentUserId}
                    currentUserEmail={this.props.currentUserEmail}
                    notificationID={defect.id}
                    title={defect.title}
                    setTitle={title => { this.updateDefectElement(defect, 'title', title) }}
                    importance={defect.importance}
                    setImportance={importance => { this.updateDefectElement(defect, 'importance', importance) }}
                    isConfirmed={defect.isConfirmed}
                    description={defect.description}
                    setDescription={description => { this.updateDefectElement(defect, 'description', description) }}
                    date={defect.created_at}
                    category={defect.category}
                    images={defect.images}
                    setImages={images => { this.updateDefectElement(defect, 'images', images) }}
                    user_id={defect.user_id}
                    user_email={defect.user_email}
                    fetchPostEvents={this.fetchPostEvents}
                    notificationsToArchive={this.updateArchiveList}
                />
            </ListGroup.Item>
        );

        const supplies = this.state.supplies.map(supply =>
            <ListGroup.Item key={supply.id} style={{ background: '#36372D' }}>
                <Event
                    key={supply.id}
                    admin={this.props.admin}
                    currentUserId={this.props.currentUserId}
                    currentUserEmail={this.props.currentUserEmail}
                    notificationID={supply.id}
                    title={supply.title}
                    setTitle={title => { this.updateSupplyElement(supply, 'title', title) }}
                    importance={supply.importance}
                    setImportance={importance => { this.updateSupplyElement(supply, 'importance', importance) }}
                    isConfirmed={supply.isConfirmed}
                    description={supply.description}
                    setDescription={description => { this.updateSupplyElement(supply, 'description', description) }}
                    date={supply.created_at}
                    category={supply.category}
                    images={supply.images}
                    setImages={images => { this.updateSupplyElement(supply, 'images', images) }}
                    user_id={supply.user_id}
                    user_email={supply.user_email}
                    fetchPostEvents={this.fetchPostEvents}
                    notificationsToArchive={this.updateArchiveList}
                />
            </ListGroup.Item>);

        const others = this.state.others.map(other =>
            <ListGroup.Item key={other.id} style={{ background: '#36372D' }}>
                <Event
                    key={other.id}
                    admin={this.props.admin}
                    currentUserId={this.props.currentUserId}
                    currentUserEmail={this.props.currentUserEmail}
                    notificationID={other.id}
                    title={other.title}
                    setTitle={title => { this.updateOtherElement(other, 'title', title) }}
                    importance={other.importance}
                    setImportance={importance => { this.updateOtherElement(other, 'importance', importance) }}
                    isConfirmed={other.isConfirmed}
                    description={other.description}
                    setDescription={description => { this.updateOtherElement(other, 'description', description) }}
                    date={other.created_at}
                    category={other.category}
                    images={other.images}
                    setImages={images => { this.updateOtherElement(others, 'images', images) }}
                    user_id={other.user_id}
                    user_email={other.user_email}
                    fetchPostEvents={this.fetchPostEvents}
                    notificationsToArchive={this.updateArchiveList}
                />
            </ListGroup.Item>);

        return (
            <div className='body'>

                <Container fluid>
                    <Row>
                        <Col sm={6}>
                            <SearchBar fetchPostEventsWhenSearch={this.fetchPostEventsWhenSearch} />
                        </Col>
                        <Col sm={{offset: 1, span:1}}>
                            <ArchiveButton
                                notificationsToArchive={this.state.notificationsToArchive}
                                fetchPostEvents={this.fetchPostEvents}
                                clearArchiveList={this.clearArchiveList}
                            />
                        </Col>

                        <Col sm={1}>
                            <ShoppingListButton
                                notificationsToShopping={this.state.notificationsToArchive}
                                fetchPostEvents={this.fetchPostEvents}
                            />

                        </Col>

                        <Col sm={1}>
                            <NotificationButton />
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

                        <Col>
                            <ListGroup.Item variant='flush' className='col_title'>
                                <h1 className='text-center'>Inne</h1>
                            </ListGroup.Item>
                            <ListGroup variant="flush" >{others}</ListGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}
