import React, { PropTypes } from 'react';
import {reduxForm} from 'redux-form';


class SignUpForm extends React.Component {
    render () {
        const {fields: {firstName, lastName, email}, onRegisterSubmit} = this.props;
        return (
            <form onSubmit={onRegisterSubmit}>
                <div>
                    <label>First Name</label>
                    <input type="text" placeholder="First Name" {...firstName}/>
                </div>
                <div>
                    <label>Last Name</label>
                    <input type="text" placeholder="Last Name" {...lastName}/>
                </div>
                <div>
                    <label>Email</label>
                    <input type="email" placeholder="Email" {...email}/>
                </div>
                <button type="submit">Submit</button>
            </form>
        );
    }
}

SignUpForm.propTypes = {
    fields: PropTypes.object.isRequired,
    // It will run validation, both sync and async, and, if the form is valid,
    // it will call this.props.onRegisterSubmit function
    handleSubmit: PropTypes.func.isRequired
    // Whether or not your form is currently submitting.
    // This prop will only work if you have passed an onSubmit function
    // that returns a promise. It will be true until the promise is resolved or rejected.
};

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
    form: 'SignUp',                           // a unique name for this form
    fields: ['firstName', 'lastName', 'email'] // all the fields in your form
})(SignUpForm);
