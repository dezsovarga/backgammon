import React, { PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { Link } from 'react-router';
import {Panel} from 'react-bootstrap';
import ValidationField from '../../../common/formFields/ValidationField.jsx';

class LoginForm extends React.Component {

    getSignupLink() {
        return (
            <Link
                to="/signup"
                id="sign-up-btn"
                className="auth-cta"
            >
                Sign Up Here
            </Link>
        );
    }

    render() {
        const {fields: {email, password}, handleSubmit} = this.props;
        let content = (
            <form className="form-horizontal"
                  onSubmit={handleSubmit}>

                <div className="form-group">
                    <label className="control-label col-xs-3">Email</label>
                    <div className="col-xs-9">
                        <ValidationField
                            type="text"
                            placeholder="Email"
                            fieldType="input"
                            {...email}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-xs-3">Password</label>
                    <div className="col-xs-9">
                        <ValidationField
                            type="password"
                            placeholder="Password"
                            fieldType="input"
                            {...password}
                        />
                    </div>
                </div>
                {/*<div className="form-group">
                    <input type="text" className="form-control input-lg" placeholder="Email" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control input-lg" placeholder="Password" />
                </div>*/}
                <div className="form-group">
                    <div className="col-xs-12">
                        <button type="submit" className="btn btn-primary">Login</button>
                    </div>
                </div>
                OR
                <span className="sign-up-link">
                    {this.getSignupLink()}
                </span>
            </form>
        );
        return (
            <div className="logo-panel-wrapper">
                <Panel header="Login" className="logo-panel text-center">
                    {content}

                </Panel>
            </div>
        );
    }
}

LoginForm.propTypes = {
    fields: PropTypes.object.isRequired,
    // it will call this.props.onRegisterSubmit function
    handleSubmit: PropTypes.func.isRequired
    // Whether or not your form is currently submitting.
    // This prop will only work if you have passed an onSubmit function
    // that returns a promise. It will be true until the promise is resolved or rejected.
};

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'loginForm', // a unique name for this form
    fields: ['email', 'password']
})(LoginForm);
