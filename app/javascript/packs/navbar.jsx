import React from 'react'
// import ReactDOM from 'react-dom'

export default class Navbar extends React.Component {

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
