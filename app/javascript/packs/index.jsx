import React from 'react'
import ReactDOM from "react-dom";
import axios from "axios";
import NotificationList from "./Notification/notifications_list"
import CreateForm from "./Notification/Create form/create_form";
import {Col, Row} from "react-bootstrap";

class Index extends React.Component {

    state ={
        admin: false,
        viewState:'',
        currentUserId:''
    };

    componentWillMount() {
        this.checkUser();
    }

    checkUser() {
        axios.get('api/v1/admin/check.json')
            .then(response =>{
                if (response.data.user_id === true){
                    this.setState({admin: true});
                    console.log("admin");
                }else{
                    this.setState({admin: false, currentUserId: response.data.user_id });
                }
            })
    }

    changeToEvent = () =>{
        this.setState({ viewState: 'event' })
    };

    changeToArchive = () =>{
        this.setState({ viewState: 'archive' })
    };

    changeToSettings = () =>{
        this.setState({ viewState: 'settings' })
    };

    changeToRecord = () =>{
        this.setState({ viewState: 'record' })
    };

    render() {

        let eventList,archiveList,settings,record,index;
        let userNavigationBar,adminNavigationBar;

        eventList = <NotificationList
            admin={this.state.admin}
            currentUserId={this.state.currentUserId}/>;
        archiveList = <div>Archiwum</div>;
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
                            <Col className="text-center"><CreateForm className="nav-item text-center" fetchPostEvents={this.props.fetchPostEvents}/></Col>
                            <Col><a className="nav-item nav-link active text-center" onClick={this.changeToEvent} >Zgłoszenia</a></Col>
                            <Col><a className="nav-item nav-link text-center" onClick={this.changeToArchive}>Archiwum</a></Col>
                            <Col><a className="nav-item nav-link text-center" onClick={this.changeToRecord}>Ewidencja</a></Col>
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
                        <Col className="text-center"><CreateForm className="nav-item text-center" fetchPostEvents={this.props.fetchPostEvents}/></Col>
                        <Col><a className="nav-item nav-link active text-center" onClick={this.changeToEvent}>Zgłoszenia</a></Col>
                        <Col><a className="nav-item nav-link text-center" onClick={this.changeToSettings}>Ustawienia</a></Col>
                    </Row>
                </div>
            </div>
        </nav>;

        if(this.state.admin){
            console.log("test log");
            switch(this.state.viewState) {
                case 'event': return index =
                        <>
                            {adminNavigationBar}
                            {eventList}
                        </>;
                case 'archive': return index =
                        <>
                            {adminNavigationBar}
                            {archiveList}
                        </>;
                case 'settings': return index =
                        <>
                            {adminNavigationBar}
                            {settings}
                        </>;
                case 'record': return index =
                        <>
                            {adminNavigationBar}
                            {record}
                        </>;
                default: return index =
                        <>
                            {adminNavigationBar}
                            {eventList}
                        </>
            }

        }
        else {
            switch (this.state.viewState) {
                case 'event':return index =
                    <>
                        {userNavigationBar}
                        {eventList}
                    </>;
                case 'settings':return index =
                    <>
                        {userNavigationBar}
                        {settings}
                    </>;
                default: return index =
                    <>
                        {userNavigationBar}
                        {eventList}
                    </>
            }
        }

        return (<>{index}</>)
    }

}

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(
        <Index />,
        document.body.appendChild(document.createElement('div')),
    )
});