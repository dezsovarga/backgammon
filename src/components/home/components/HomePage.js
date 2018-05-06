import React from 'react';
import bg_logo from 'images/backgammon-logo-22.png';

export default class HomePage extends React.Component {

    render() {

        return (
            <div className="row">
                <div className="leftcolumn">
                    <div className="home_page">
                        <img className="header_image" src={bg_logo} />

                        <div className="welcome_section">
                            <h2 className="title_text">Welcome To Hobby Gammon</h2>
                            <p>Welcome to Hobby Backgammon! Join other online players in the world’s most popular board game – Backgammon.
                                Hone your skills, challenge other players and climb the leader board in this dynamic online game.</p>

                        </div>
                    </div>

                </div>

            </div>

        );
    }
}