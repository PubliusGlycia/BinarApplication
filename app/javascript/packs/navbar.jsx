import React from 'react'
import CreateForm from './create_form';

export default class Navbar extends React.Component {

    state = {
        defects: [],
        supplies: [],
        isLoadingDefects: false,
        isLoadingSupplies: false
    }

    fetchPostEvents = () => {
        this.setState({ isLoadingDefects: true, isLoadingSupplies: true })
        fetch("/post_events/event/defect.json")
          .then(response => response.json())
          .then(posts_events => {
            this.setState({ defects: posts_events, isLoadingDefects: false });
            });
        fetch("/post_events/event/supply.json")
            .then(response => response.json())
            .then(posts_events => {
              this.setState({ supplies: posts_events, isLoadingSupplies: false });
              });
    };

    render() {

        return (
            <nav className="navbar navbar-expand-lg navbar-dark styled">
                    <style dangerouslySetInnerHTML={{__html: `
                        .styled { background-color: #4919aa; }
                    `}} />
                <span className="navbar-brand my-0 h1" href="#">BinarOffice</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <CreateForm className="nav-item" fetchPostEvents={this.props.fetchPostEvents}/>
                        <a className="nav-item nav-link active" href="#">Zgłoszenia</a>
                        { this.props.admin && <a className="nav-item nav-link" href="#">Archiwum</a> }
                        { this.props.admin && <a className="nav-item nav-link" href="#">Ewidencja</a> }
                        <a className="nav-item nav-link" href="#">Ustawienia</a>
                    </div>
                </div>
            </nav>
        );
    }
}
