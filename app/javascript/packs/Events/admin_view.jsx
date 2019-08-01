import React from 'react';
import Event from './event';
import SearchBar from './search_bar';
import axios from 'axios'
import ArchiveButton from "./Archive/archive_button"
import ShoppingListButton from './ShoppingList/shopping_list_button'
import {Col, Container, ListGroup, Row} from 'react-bootstrap';
import NotificationButton from "../Notifications/notification_button";
import LogoutButton from '../logout_button';



export default class AdminView extends React.Component {
    state = {
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
                this.setState({ notificationsToArchive: tmpArray }
                );
            }
        }

    };

    clearArchiveList = () => {
        this.setState({ notificationsToArchive: '' })
    };

    render() {
        const defects = this.props.defects.map(defect =>
            <ListGroup.Item key={defect.id} style={{ background: '#36372D' }}>
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
        );

        const supplies = this.props.supplies.map(supply =>
            <ListGroup.Item key={supply.id} style={{ background: '#36372D' }}>
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
                    setProgress={in_progress => {this.props.updateSupplyElement(supply, 'in_progress', in_progress)}}
                />
            </ListGroup.Item>);

        const others = this.props.others.map(other =>
            <ListGroup.Item key={other.id} style={{ background: '#36372D' }}>
                <Event
                    key={other.id}
                    admin={this.props.admin}
                    currentUserId={this.props.currentUserId}
                    currentUserEmail={this.props.currentUserEmail}
                    notificationID={other.id}
                    title={other.title}
                    setTitle={title => { this.props.updateOtherElement(other, 'title', title) }}
                    importance={other.importance}
                    setImportance={importance => { this.props.updateOtherElement(other, 'importance', importance) }}
                    isConfirmed={other.isConfirmed}
                    description={other.description}
                    setDescription={description => { this.props.updateOtherElement(other, 'description', description) }}
                    date={other.created_at}
                    category={other.category}
                    images={other.images}
                    setImages={images => { this.props.updateOtherElement(others, 'images', images) }}
                    user_id={other.user_id}
                    user_email={other.user_email}
                    fetchPostEvents={this.props.fetchPostEvents}
                    notificationsToArchive={this.updateArchiveList}
                    in_progress= {other.in_progress}
                    setProgress={in_progress => {this.props.updateOtherElement(other, 'in_progress', in_progress)}}
                />
            </ListGroup.Item>);

        return (
            <div className='body'>

                <Container fluid>
                    <Row>
                        <Col sm={6}>
                            <SearchBar fetchPostEventsWhenSearch={this.props.fetchPostEventsWhenSearch} />
                        </Col>
                        <Col sm={{offset: 1, span:1}}>
                            <ArchiveButton
                                notificationsToArchive={this.state.notificationsToArchive}
                                fetchPostEvents={this.props.fetchPostEvents}
                                clearArchiveList={this.clearArchiveList}
                            />
                        </Col>

                        <Col sm={1}>
                            <ShoppingListButton notificationsToShopping={this.state.notificationsToArchive}/>
                        </Col>

                        <Col sm={1}>
                            <NotificationButton currentUserId={this.props.currentUserId} />
                        </Col>
                        <Col sm={1}>
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
