import React, { Component } from 'react';
import {SUCCESSFULLY_VERIFIED, ALREADY_VERIFIED} from '../constants';
import checkMarkIcon from 'images/checkmark.png';
import xIcon from 'images/ico-x.png';
import alreadyVerifiedIcon from 'images/already_verified.png';

export default class ConfirmationPage extends Component {

    getConfirmMessage(title, icon, body) {
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2" >
                        <h1 className="text-center">
                            {title}
                        </h1>
                        <div className="text-center">
                            <img className="confirmation-icon text-center" src={icon} />
                        </div>

                        <h5 className="text-center">
                            {body}
                        </h5>
                    </div>
                </div>
            </div>
        );

    }

    getSuccessMessage() {

        return(
            this.getConfirmMessage("Congratulations", checkMarkIcon, SUCCESSFULLY_VERIFIED)
        );
    }

    getFailureMessage(error) {
        return (
            this.getConfirmMessage("Oh no! Something went wrong.", xIcon, error)
        );
    }

    getAlreadyVerifiedMessage() {
        return(
            this.getConfirmMessage("Already verified!", alreadyVerifiedIcon, ALREADY_VERIFIED)
        );
    }

    render() {

        const {confirm:{error, authData, statusCode}} = this.props;
        const success = !error && authData;
        const alreadyVerified = !success && statusCode === 409;

        let messagePanel = null;

        if (success) {
            messagePanel = this.getSuccessMessage();
        } else if (alreadyVerified){
            messagePanel = this.getAlreadyVerifiedMessage();
        } else {
            messagePanel = this.getFailureMessage(error);
        }
        return (
            <div>
                {messagePanel}
            </div>
        );
    }
}