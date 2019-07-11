import React from 'react'
import ReactDOM from 'react-dom'

class Navbar extends React.Component {

    render() {

        return (
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <span class="navbar-brand my-0 h1" href="#">BinarOffice</span>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav">
                        <a class="nav-item nav-link active" href="#">Zgłoszenia</a>
                        { this.props.admin && <a class="nav-item nav-link" href="#">Archiwum</a> }
                        { this.props.admin && <a class="nav-item nav-link" href="#">Ewidencja</a> }
                        <a class="nav-item nav-link" href="#">Ustawienia</a>
                    </div>
                </div>
            </nav>
        );
    }
}

ReactDOM.render(<Navbar admin={true} />, document.body.appendChild(document.createElement('div')));
