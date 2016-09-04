import React, { PropTypes } from 'react';
import {reduxForm} from 'redux-form';
import {Grid, Row, Col, PageHeader, Panel} from 'react-bootstrap';
import ValidationField from '../../common/formFields/ValidationField.jsx';

const validate = values => {
    const errors = {};
    if (!values.firstName) {
        errors.firstName = 'Required';
    } else if (values.firstName.length > 15) {
        errors.firstName = 'Must be 15 characters or less'
    }
    if (!values.lastName) {
        errors.lastName = 'Required'
    } else if (values.lastName.length > 15) {
        errors.lastName = 'Must be 15 characters or less'
    }
    if (!values.email) {
        errors.email = 'Required'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }

    return errors
}
class SignUpForm extends React.Component {

    render () {
        const {fields: {firstName, lastName, email, password, confirmPassword}, handleSubmit} = this.props;
        let content = (
            <form className="form-horizontal"
                  onSubmit={ handleSubmit(this.props.onRegisterSubmit) }>
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
                        <input type="email"
                               className="form-control"
                               id="inputEmail"
                               placeholder="Email"
                               {...email}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-xs-3">Password</label>
                    <div className="col-xs-9">
                        <input type="password"
                               className="form-control"
                               id="inputPassword"
                               placeholder="Password"
                               {...password}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-xs-3">Confirm Password</label>
                    <div className="col-xs-9">
                        <input type="password"
                               className="form-control"
                               id="inputConfirmPassword"
                               placeholder="Confirm Password"
                               {...confirmPassword}
                        />
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-offset-2 col-xs-10">
                        <div className="checkbox">
                            <label><input type="checkbox"/> Remember me</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <div className="col-xs-offset-2 col-xs-10">
                        <button type="submit" className="btn btn-primary">Register</button>
                    </div>
                </div>
            </form>

        );
        return (
            <div className="logo-panel-wrapper">
                <Panel header="Sign up" className="logo-panel">
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
    fields: ['firstName', 'lastName', 'email', 'password', 'conformPassword'], // all the fields in your form
    validate
})(SignUpForm);
