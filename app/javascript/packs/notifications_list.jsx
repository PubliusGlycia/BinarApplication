import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';
import CreateForm from './create_form';
import axios from 'axios-on-rails';
import Navbar from "./navbar";

class NotificationList extends React.Component {
    state = {
        defects: [],
        supplies: [],
        isLoading: false
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
        // axios.get('/post_event', {
        //     params: {
        //         category: 'defect'
        //     }})
        //     .then(response => response.json())
        //     .then(post_events => {
        //         this.setState({ defects: post_events, isLoading: false});
        //     });

    };

    componentDidMount() {
        this.fetchPostEvents();
    }

    render() {
        const defects = this.state.defects.map(defect => {
            console.log(defect)
            return <Notification key={defect.id} title={defect.title} importance={defect.importance} isConfirmed={defect.isConfirmed}/>})
        
            
        
        const supplies = this.state.supplies.map(supply =>
            <Notification key={supply.id} title={supply.title} importance={supply.importance} isConfirmed={supply.isConfirmed}/>)
            
        return (
            <>
                <Navbar admin={true} />
                < CreateForm fetchPostEvents={this.fetchPostEvents}/>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col'>

                            <div className='list-group'>
                                <div className='list-group-item list-group-item-secondary'><h1 className='text-center'>Awarie</h1></div> 
                                {defects}
                            </div>
                        </div>
                            
                        <div className='col'>
                            <div className='list-group'>
                                <div className='list-group-item list-group-item-secondary'><h1 className='text-center'>Zapotrzebowanie</h1></div> 
                                {supplies}
                            </div>
                        </div>
                    </div>
                </div>  
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