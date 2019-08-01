import React from 'react';
import Event from './event';
import SearchBar from './search_bar';
import LogoutButton from '../logout_button';
import axios from 'axios'
import {Col, Container, ListGroup, Row} from 'react-bootstrap';
import NotificationButton from "../Notifications/notification_button";


export default class NotificationList extends React.Component {
    state = {
        defects: [],
        supplies: [],
        notificationsToArchive: []
    };

    componentDidMount() {
        this.props.fetchPostEvents();
    }


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
                this.setState({ notificationsToArchive: tmpArray });
            }
        }

    };

    clearArchiveList = () => {
        this.setState({ notificationsToArchive: '' })
    };

    render() {

        const defects = this.props.defects.map(defect =>
            <p id={defect.id} >
                <ListGroup.Item key={defect.id} style={{background: 'transparent'}}>
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
                        in_progress= {defect.in_progress}
                        setProgress={in_progress => {this.updateDefectElement(defect, 'in_progress', in_progress)}}
                    />
                </ListGroup.Item>
            </p>
        );
        const supplies = this.props.supplies.map(supply =>
            <p id={supply.id}>
                <ListGroup.Item  key={supply.id} style={{background: 'transparent'}}>
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
                        in_progress= {supply.in_progress}
                        setProgress={in_progress => {this.updateDefectElement(supply, 'in_progress', in_progress)}}
                    />
                </ListGroup.Item>
            </p>
            );

        return (
            <div className='body'>

                <Container fluid>
                    <Row>
                        <Col sm={9}>
                            <SearchBar fetchPostEventsWhenSearch={this.props.fetchPostEventsWhenSearch} />
                        </Col>

                        <Col sm={1}>
                            <NotificationButton currentUserId={this.props.currentUserId} />
                        </Col>
                        <Col sm={2}>
                            <LogoutButton />
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
