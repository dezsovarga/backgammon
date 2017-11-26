import React, { Component } from 'react';

export default class ConfirmationPage extends Component {
    render() {

        const {confirm:{error, authData, statusCode}} = this.props;
        const success = !error && authData;
        const alreadyVerified = !success && statusCode === 409;
        return (
            <div>
                Congratulations, your email address was confirmed successfully

            </div>
        );
    }
}