import React from "react";
import {Col, ListGroup} from "react-bootstrap";
import ArchiveEvent from "./archive_event";
import axios from "axios"

export default class ArchiveList extends React.Component {
    state = {
        archive: []
    };

    fetchArchiveList(){
        axios.get('api/v1/post_events/archive.json'
        ).then(archive_params => {
                this.setState({ archive: archive_params.data })
            });
    }

    componentDidMount() {
        this.fetchArchiveList();
    }

    render() {
        const archive = this.state.archive.map(archive =>
            <ListGroup.Item key={archive.id} style={{ background: '#36372D' }}>
                <ArchiveEvent
                    key={archive.id}
                    admin={this.props.admin}
                    currentUserId={this.props.currentUserId}
                    notificationID={archive.id}
                    title={archive.title}
                    importance={archive.importance}
                    isConfirmed={archive.isConfirmed}
                    description={archive.description}
                    date={archive.created_at}
                    category={archive.category}
                    images={archive.images}
                    user_id={archive.user_id}
                    fetchPostEvents={this.fetchPostEvents}
                    notificationsToArchive={this.updateArchiveList}
                />
            </ListGroup.Item>);
        return (
            <div className='body'>
                <Col>
                    <ListGroup.Item variant='flush' className='col_title'>
                        <h1 className='text-center'>Archiwum</h1>
                    </ListGroup.Item>
                    <ListGroup variant="flush" >{archive}</ListGroup>
                </Col>
            </div>)
    }
}