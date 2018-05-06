import React from 'react';
import bg_header_image from 'images/bg_header_9.png';

export default class Header extends React.Component {

    render() {

        return (
            <div className="header">
                <img className="header_image" src={bg_header_image} />
            </div>
        );
    }
}