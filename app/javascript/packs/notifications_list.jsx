import React from 'react';
import ReactDOM from 'react-dom';

class NotificationList extends React.Component {
    render() {
        return (
            <>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-6'>
                            <ul className='list-group'>
                                <li className='list-group-item'>Awaria 1</li>
                                <li className='list-group-item'>Awaria 2</li>
                                <li className='list-group-item'>Awaria 3</li>
                                <li className='list-group-item'>Awaria 4</li>
                                <li className='list-group-item'>Awaria 5</li>
                            </ul>
                        </div>
                            
                        <div className='col-md-6'>
                            <ul className='list-group'>
                                <li className='list-group-item'>Zapotrzebowanie 1</li>
                                <li className='list-group-item'>Zapotrzebowanie 2</li>
                                <li className='list-group-item'>Zapotrzebowanie 3</li>
                                <li className='list-group-item'>Zapotrzebowanie 4</li>
                                <li className='list-group-item'>Zapotrzebowanie 5</li>
                            </ul>
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