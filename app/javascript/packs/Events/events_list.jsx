import React from 'react';
import Event from './event';
import SearchBar from './search_bar';
import LogoutButton from '../logout_button';
import {Col, Container, ListGroup, Row, Navbar} from 'react-bootstrap';
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
            <div className="targetDiv" id={defect.id} >
                <ListGroup.Item key={defect.id} style={{background: 'transparent',cursor: 'pointer'}}>
                    <Event
                        key={defect.id}
                        admin={this.props.admin}
                        currentUserId={this.props.currentUserId}
                        currentUserEmail={this.props.currentUserEmail}
                        notificationID={defect.id}
                        title={defect.title}
                        setTitle={title => { this.props.updateDefectElement(defect, 'title', title) }}
                        importance={defect.importance}
                        setImportance={importance => { this.props.updateDefectElement(defect, 'importance', importance) }}
                        isConfirmed={defect.isConfirmed}
                        description={defect.description}
                        setDescription={description => { this.props.updateDefectElement(defect, 'description', description) }}
                        date={defect.created_at}
                        category={defect.category}
                        images={defect.images}
                        setImages={images => { this.props.updateDefectElement(defect, 'images', images) }}
                        user_id={defect.user_id}
                        user_email={defect.user_email}
                        fetchPostEvents={this.props.fetchPostEvents}
                        notificationsToArchive={this.updateArchiveList}
                        in_progress= {defect.in_progress}
                        setProgress={in_progress => {this.props.updateDefectElement(defect, 'in_progress', in_progress)}}
                    />
                </ListGroup.Item>
            </div>
        );
        const supplies = this.props.supplies.map(supply =>
            <div className="targetDiv" id={supply.id}>
                <ListGroup.Item  key={supply.id} style={{background: 'transparent',cursor: 'pointer'}}>
                    <Event
                        key={supply.id}
                        admin={this.props.admin}
                        currentUserId={this.props.currentUserId}
                        currentUserEmail={this.props.currentUserEmail}
                        notificationID={supply.id}
                        title={supply.title}
                        setTitle={title => { this.props.updateSupplyElement(supply, 'title', title) }}
                        importance={supply.importance}
                        setImportance={importance => { this.props.updateSupplyElement(supply, 'importance', importance) }}
                        isConfirmed={supply.isConfirmed}
                        description={supply.description}
                        setDescription={description => { this.props.updateSupplyElement(supply, 'description', description) }}
                        date={supply.created_at}
                        category={supply.category}
                        images={supply.images}
                        setImages={images => { this.props.updateSupplyElement(supply, 'images', images) }}
                        user_id={supply.user_id}
                        user_email={supply.user_email}
                        fetchPostEvents={this.props.fetchPostEvents}
                        notificationsToArchive={this.updateArchiveList}
                        in_progress= {supply.in_progress}
                        setProgress={in_progress => {this.props.updateDefectElement(supply, 'in_progress', in_progress)}}
                    />
                </ListGroup.Item>
            </div>
            );

        return (
            <div className='body'>

                <Container fluid>
                    <Navbar style={{ backgroundColor: '#4919aa', marginLeft: '-15px', marginRight: '-15px' }}>
                        <Col sm={9}>
                            <SearchBar fetchPostEventsWhenSearch={this.props.fetchPostEventsWhenSearch} />
                        </Col>

                        <Col sm={1} style={{ textAlign: 'center' }}>
                            <NotificationButton currentUserId={this.props.currentUserId} />
                        </Col>
                        <Col sm={2}>
                            <LogoutButton />
                        </Col>
                    </Navbar>


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
