import React from 'react';
import { Media, Card } from 'react-bootstrap';
import defaultProfilePicture from 'images/default_profile_picture.jpg'

export default class Message extends React.Component {
    render() {
        return (
            <Card className='my-2' style={{ width: '90%', background: '#2B185C' }}>
                <Card.Body style={{ maxWidth: '100%'}}>
                    <Media>
                        <img
                        width={56}
                        height={56}
                        className="mr-3"
                        src={defaultProfilePicture}
                        alt="<profile pic>"
                        style={{ outline: '2px solid #9C82D0', MozOutlineRadius: '2px' }}
                        />
                        <Media.Body>
                            <h6 style={{ font: 'Muli', color: '#EEE' }}>{ this.props.author }</h6>
                            <div style={{ font: 'Muli', fontSize: '11px', color:'#EEE' }}>
                                Created: { this.props.created }
                            </div>
                            <hr className='mt-1' style={{ background: '#9C82D0' }}/>
                            <div style={{ font: 'Muli', fontSize: '13px', color:'#EEE', wordBreak: 'break-word' }}>
                                { this.props.content }
                            </div>
                        </Media.Body>
                    </Media>
                </Card.Body>
            </Card>
        );
    }
}
