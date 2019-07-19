import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';
import CreateForm from './Create form/create_form';
import Navbar from "../navbar";


import {Col, Container, ListGroup, Row} from 'react-bootstrap';

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

    updateDefectElement = (defect, key, value) => {
        this.setState({defects: this.state.defects.map(index => {
            if(index.id === defect.id) {
                return {...index, [key]: value}
            } else {
                return index;
            }
        })})
    }

    updateSupplyElement = (supply, key, value) => {
        this.setState({supplies: this.state.supplies.map(index => {
            if(index.id === supply.id) {
                return {...index, [key]: value}
            } else {
                return index;
            }
        })})
    }

    render() {
        const defects = this.state.defects.map(defect => {
            console.log(defect)
            return <Notification
                key={defect.id}
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
            />})



        const supplies = this.state.supplies.map(supply =>
            <Notification
                key={supply.id}
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