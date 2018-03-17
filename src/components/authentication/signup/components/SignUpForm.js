import React, { PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import { Link } from 'react-router-dom';
import {Grid, Row, Col, PageHeader, Panel} from 'react-bootstrap';
import ValidationField from 'common/formFields/ValidationField';

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less';
    }
    if (!values.lastName) {
        errors.lastName = 'Required';
    } else if (values.lastName.length > 15) {
        errors.lastName = 'Must be 15 characters or less';
    }
    if (!values.email) {
        errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address';
    }
    if (!values.password) {
        errors.password = 'Required';
    } else{
        if (values.password.length <6){
            errors.password = "Must be longer than 6 characters";
        }
    }
    if (values.password !== values.confirmPassword) {
        errors.confirmPassword = "Passwords do not match";
    }

    return errors;
};
class SignUpForm extends React.Component {

    getLoginLink() {
        return (
            <Link to="/login">
                Login Here
            </Link>
        );
    }

    getError(error) {
        if (!error) {
            return null;
        }

        return (
            <div className="login-text-content error">
                {error}
            </div>
        );
    }

    render () {
        const {fields: {firstName, lastName, email, password, confirmPassword}, handleSubmit} = this.props;
        const {signUp: { error } } = this.props;
        let content = (
            <form className="form-horizontal"
                  onSubmit={handleSubmit(this.props.onRegisterSubmit)}>
                <div className="form-group">
                    <label className="control-label col-xs-3">First Name</label>
                    <div className="col-xs-9">
                        <ValidationField
                            type="text"
                            placeholder="First Name"
                            fieldType="input"
                            {...firstName}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-xs-3">Last Name</label>
                    <div className="col-xs-9">
                        <ValidationField
                            type="text"
                            placeholder="Last Name"
                            fieldType="input"
                            {...lastName}
                        />
                    </div>
                </div>
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
                <div className="form-group">
                    <label className="control-label col-xs-3">Confirm Password</label>
                    <div className="col-xs-9">
                        <ValidationField
                            type="password"
                            placeholder="Confirm Password"
                            fieldType="input"
                            {...confirmPassword}
                        />
                    </div>
                </div>
                {this.getError(error)}
                <div className="form-group">
                    <div className="col-xs-12">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </div>
                OR
                <span className="login-link">
                    {this.getLoginLink()}
                </span>
            </form>

        );
        return (
            <div className="logo-panel-wrapper">
                <Panel header="Sign up" className="logo-panel text-center">
                    {content}
                </Panel>
            </div>
        );
    }
}

SignUpForm.propTypes = {
    fields: PropTypes.object.isRequired,
    // It will run validation, both sync and async, and, if the form is valid,
    // it will call this.props.onRegisterSubmit function
    handleSubmit: PropTypes.func.isRequired,
    onRegisterSubmit: PropTypes.func.isRequired
    // Whether or not your form is currently submitting.
    // This prop will only work if you have passed an onSubmit function
    // that returns a promise. It will be true until the promise is resolved or rejected.
};

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'SignUpForm',                           // a unique name for this form
    fields: ['firstName', 'lastName', 'email', 'password', 'confirmPassword'], // all the fields in your form
    validate
})(SignUpForm);
