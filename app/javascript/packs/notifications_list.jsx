import React from 'react';
import ReactDOM from 'react-dom';
import Notification from './notification';

class NotificationList extends React.Component {
    state = {
        breakdowns: [{
            title: 'Ekspres do kawy nie działa!',
            importance: 'high',
            isConfirmed: true
        },
        {
            title: 'Zapchana męska toaleta',
            importance: 'high',
            isConfirmed: false
        },
        {
            title: 'Drzwi skrzypią',
            importance: 'medium',
            isConfirmed: true
        },
        {
            title: 'Coś nie działa',
            importance: 'low',
            isConfirmed: true
        },],
        requests: [{
            title: 'Zielona herbata',
            importance: 'high',
            isConfirmed: true
        },
        {
            title: 'Papier toaletowy!!!',
            importance: 'high',
            isConfirmed: true
        },
        {
            title: 'Kawa się kończy',
            importance: 'medium',
            isConfirmed: false
        },
        {
            title: 'W sumie to nic',
            importance: 'low',
            isConfirmed: false
        },]
    }
    render() {
        const breakdowns = this.state.breakdowns.map(breakdown =>
            <Notification title={breakdown.title} importance={breakdown.importance} isConfirmed={breakdown.isConfirmed}/>)
        
        const requests = this.state.requests.map(request =>
            <Notification title={request.title} importance={request.importance} isConfirmed={request.isConfirmed}/>)
        return (
            <>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col'>

                            <div className='list-group'>
                                <div className='list-group-item list-group-item-secondary'><h1 className='text-center'>Awarie</h1></div> 
                                {breakdowns}
                            </div>
                        </div>
                            
                        <div className='col'>
                            <div className='list-group'>
                                <div className='list-group-item list-group-item-secondary'><h1 className='text-center'>Zapotrzebowanie</h1></div> 
                                {requests}
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