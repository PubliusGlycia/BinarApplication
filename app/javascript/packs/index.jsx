import React from 'react'
import ReactDOM from "react-dom";
import axios from "axios";
import EventList from "./Events/events_list";
import ArchiveList from "./Events/Archive/archive_list";
import AdminView from "./Events/admin_view"
import CreateForm from "./Events/Create form/create_form";
import {Col, Row} from "react-bootstrap";

class Index extends React.Component {

    state = {
        others: [],
        defects: [],
        supplies: [],
        admin: false,
        viewState: '',
        currentUserId: '',
        currentUserEmail: ''
    };

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
        if(this.state.admin) {
            this.othersFetchPostEventsWhenSearch(phrase);
        }
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
        if (this.state.admin) {
            this.othersFetchPostEvents();
        }
    };


    othersFetchPostEventsWhenSearch = (phrase) => {
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

    othersFetchPostEvents = () => {
        axios.get('api/v1/post_events/event.json', {
            params: {
                category: 'others'
            }
        })
            .then(posts_events => {
                this.setState({ others: posts_events.data })
            })
    };

    componentWillMount() {
        this.checkUser();
    }

    checkUser() {
        axios.get('api/v1/admin/check.json')
            .then(response => {
                if (response.data.admin === true) {
                    this.setState({ admin: true, currentUserId: response.data.user_id });
                } else {
                    this.setState({ admin: false, currentUserId: response.data.user_id, currentUserEmail: response.data.user_email });
                }
            })
    }

    changeToEvent = () => {
        this.setState({ viewState: 'event' })
    };

    changeToArchive = () => {
        this.setState({ viewState: 'archive' })
    };

    changeToSettings = () => {
        this.setState({ viewState: 'settings' })
    };

    changeToRecord = () => {
        this.setState({ viewState: 'record' })
    };

    handleClick = (e) => {
        e.preventDefault();
        if (localStorage.getItem('pop-upWindows') !== 'true') {
            alert('Aby wyświetlić oba okna ewidencji należy zezwolić w swojej przeglądarce na wyskakujące okna.');
            localStorage.setItem('pop-upWindows', 'true');
        }
        window.open('https://docs.google.com/spreadsheets/d/1PyMQd9ta-tJFfRU6DT1Re9y1M-d4VSPgPMf4KENxwTU/edit?usp=sharing');
        window.open('https://taurus.binarapps.com/equipment');
    };

    render() {

        let eventList, archiveList, settings, record, index, footer;
        let userNavigationBar, adminNavigationBar;
        this.state.admin ? eventList = <AdminView
            admin={this.state.admin}
            currentUserId={this.state.currentUserId}
            currentUserEmail={this.state.currentUserEmail}
            others={this.state.others}
            defects={this.state.defects}
            supplies={this.state.supplies}
            fetchPostEvents={this.fetchPostEvents}
            fetchPostEventsWhenSearch={this.fetchPostEventsWhenSearch}
            updateDefectElement={this.updateDefectElement}
            updateSupplyElement={this.updateSupplyElement}
            updateOtherElement={this.updateOtherElement}
        />
            : eventList = <EventList
                admin={this.state.admin}
                currentUserId={this.state.currentUserId}
                currentUserEmail={this.state.currentUserEmail}
                defects={this.state.defects}
                supplies={this.state.supplies}
                fetchPostEvents={this.fetchPostEvents}
                fetchPostEventsWhenSearch={this.fetchPostEventsWhenSearch}
                updateDefectElement={this.updateDefectElement}
                updateSupplyElement={this.updateSupplyElement}
            />;
        archiveList = <ArchiveList admin={this.state.admin}
                                   currentUserId={this.state.currentUserId}/>;
        settings = <div>Ustwienia</div>;
        record = <div>Ewidencja</div>;

        adminNavigationBar = <nav className="navbar navbar-expand-lg navbar-dark" id='binar-navi'>
            <span className="navbar-brand my-0 h1" href="#">BinarOffice</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav w-100">
                    <Row className="w-100">
                        <Col className="text-center">
                            <CreateForm className="nav-item text-center" fetchPostEvents={this.fetchPostEvents} />
                        </Col>
                        <Col><a className="nav-item nav-link active text-center" onClick={this.changeToEvent} >Zgłoszenia</a></Col>
                        <Col><a className="nav-item nav-link text-center" onClick={this.changeToArchive}>Archiwum</a></Col>
                        <Col><a className="nav-item nav-link text-center" onClick={this.handleClick}>Ewidencja</a></Col>
                        <Col><a className="nav-item nav-link text-center" onClick={this.changeToSettings}>Ustawienia</a></Col>
                    </Row>
                </div>
            </div>
        </nav>;

        userNavigationBar = <nav className="navbar navbar-expand-lg navbar-dark" id='binar-navi'>
            <span className="navbar-brand my-0 h1" href="#">BinarOffice</span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav w-100">
                    <Row className="w-100">
                        <Col className="text-center">
                            <CreateForm className="nav-item text-center" fetchPostEvents={this.fetchPostEvents} />
                        </Col>
                        <Col><a className="nav-item nav-link active text-center" onClick={this.changeToEvent}>Zgłoszenia</a></Col>
                        <Col><a className="nav-item nav-link text-center" onClick={this.changeToSettings}>Ustawienia</a></Col>
                    </Row>
                </div>
            </div>
        </nav>;

        footer = <footer className="footer">
            <p className="footer-paragraph">
                Damian Byszewski, Maciej Gutenplan, Adam Jędrzejec, Wojciech Oset - letnie praktyki BinarApps 2019
            </p>
        </footer>

        if (this.state.admin) {
            switch (this.state.viewState) {
                case 'event': return index =
                    <>
                        {adminNavigationBar}
                        {eventList}
                        {footer}
                    </>;
                case 'archive': return index =
                    <>
                        {adminNavigationBar}
                        {archiveList}
                        {footer}
                    </>;
                case 'settings': return index =
                    <>
                        {adminNavigationBar}
                        {settings}
                        {footer}
                    </>;
                case 'record': return index =
                    <>
                        {adminNavigationBar}
                        {record}
                        {footer}
                    </>;
                default: return index =
                    <>
                        {adminNavigationBar}
                        {eventList}
                        {footer}
                    </>
            }

        }
        else {
            switch (this.state.viewState) {
                case 'event': return index =
                    <>
                        {userNavigationBar}
                        {eventList}
                        {footer}
                    </>;
                case 'settings': return index =
                    <>
                        {userNavigationBar}
                        {settings}
                        {footer}
                    </>;
                default: return index =
                    <>
                        {userNavigationBar}
                        {eventList}
                        {footer}
                    </>
            }
        }
    }

}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Index />,
        document.body.appendChild(document.createElement('div')),
    )
});