import React, { Component } from 'react';
/*import Loader from 'shared/ui/Loader';*/
import confirmEmailIcon from 'images/confirmation-email.png';

export default class SignUpInProgress extends Component {

    getMailResentNotification(mailResent, username) {
        const mailResentNotification = mailResent ?
            `Confirmation email was resent to ${username}` : '';
        return mailResentNotification;
    }

    render() {
        const { registrationData, submitting, token, mailReSent } = this.props.signUp;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2" >
                        <h3 className="text-center">
                            Welcome!
                        </h3>
                        <p className="login-text-content">
                            Please confirm your email address to get started.
                        </p>

                        <div className="confirmation-email text-center">
                            <img className="confirm-email-icon" src={confirmEmailIcon} />
                        </div>

                        <div className="confirm-username">
                            {registrationData.email}
                        </div>

                        <div className="confirm-text-content text-center">
                            Please click on the link in your email to verify your address.
                        </div>

                        <input
                            id="hidden-token"
                            type="hidden"
                            className="registerResponse"
                            value={token}
                        />

                        <div className="confirmation-mail-resent">
                            {this.getMailResentNotification(mailReSent, registrationData.email)}
                        </div>

                        <div className="text-center">
                            <button
                                id="resend-confirmation-email"
                                type="submit"
                                className="btn btn-primary"
                                disabled={submitting}
                                onClick= {this.props.resendConfirmationEmail}
                            >
                                Re-send Confirmation Email
                                {/*{ submitting ? <Loader className="small-loader white" /> : '' }*/}
                            </button>
                        </div>

                        <div className="confirmation-note text-center">
                            Note: This link is available for 24 hours
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}
