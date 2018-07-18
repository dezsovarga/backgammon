// import React, {PropTypes} from 'react';
// import { connect } from 'react-redux'
// import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
// import {Field, reduxForm} from "redux-form";
// import ValidationField from 'common/formFields/ValidationField';
//
// class EditAccountForm extends React.Component {
//
//     onRowClick(row) {
//         console.log(row);
//     }
//
//     handleSubmit(editAccountData) {
//         console.log("edit account hehe...");
//     }
//
//     render() {
//
//         const {fields: {email, firstName, lastName, rating, active}, handleSubmit} = this.props;
//         const {admin:{accountToEdit}} = this.props;
//         return (
//             <div className="edit-account-form" >
//                 <form className="form-horizontal" onSubmit={handleSubmit(this.handleSubmit)}>
//                     <div className="form-group row">
//                         <label htmlFor="colFormLabelSm"
//                                className="col-sm-2 col-form-label">Email</label>
//                         <div className="col-sm-7">
//                             <Field component={(props) => {
//                                 return (
//
//                                         <input className="form-control" type="text" {...props} />
//                                 )
//                             }}
//                                    name="email"
//                                    type="text"
//                             />
//
//                             {/*<input name="email" type="email" className="form-control" id="colFormLabelSm"
//                                   placeholder="col-form-label-sm" defaultValue={accountToEdit.email}/> */}
//                         </div>
//                     </div>
//                     <div className="form-group row">
//                         <label htmlFor="colFormLabel" className="col-sm-2 col-form-label">First Name</label>
//                         <div className="col-sm-7">
//                             <input name="firstName" type="text" className="form-control" id="colFormLabel" placeholder="col-form-label"
//                                    defaultValue={accountToEdit.firstName} />
//                         </div>
//                     </div>
//                     <div className="form-group row">
//                         <label htmlFor="colFormLabelLg"
//                                className="col-sm-2 col-form-label">Last Name</label>
//                         <div className="col-sm-7">
//                             <input name="lastName" type="text" className="form-control" id="colFormLabelLg"
//                                    placeholder="col-form-label-lg" defaultValue={accountToEdit.lastName} />
//                         </div>
//                     </div>
//
//                     <div className="form-group row">
//                         <label htmlFor="colFormLabelLg"
//                                className="col-sm-2 col-form-label">Rating</label>
//                         <div className="col-sm-2">
//                             <input name="rating" type="text" className="form-control" id="colFormLabelLg"
//                                    placeholder="col-form-label-lg" defaultValue={accountToEdit.rating} />
//                         </div>
//                     </div>
//
//                     <div className="form-group row">
//                         <label htmlFor="colFormLabelLg"
//                                className="col-sm-2 col-form-label">Active</label>
//                         <div className="col-sm-1">
//                             <input name="active" className="form-check-input" type="checkbox" id="inlineCheckbox1"
//                                    defaultChecked={accountToEdit.active} />
//                         </div>
//                     </div>
//                     <button type="submit" className="btn btn-primary">Submit</button>
//                 </form>
//             </div>
//         );
//     }
// }
//
//
// EditAccountForm.propTypes = {
//     fields: PropTypes.object.isRequired,
//     // it will call this.props.onRegisterSubmit function
//     handleSubmit: PropTypes.func.isRequired
//     // Whether or not your form is currently submitting.
//     // This prop will only work if you have passed an onSubmit function
//     // that returns a promise. It will be true until the promise is resolved or rejected.
// };
//
// EditAccountForm = reduxForm({
//     form: 'editAccountForm' // a unique identifier for this form
// })(EditAccountForm)
//
// // You have to connect() to any reducers that you wish to connect to yourself
// EditAccountForm = connect(
//     state => ({
//         initialValues: state.admin.accountToEdit // pull initial values from account reducer
//     })
//
// )(EditAccountForm)
//
// export default EditAccountForm
//
//
// // export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
// //     form: 'editAccountForm', // a unique name for this form
// //     fields: {email, 'firstName', 'lastName', 'rating', 'active'}
// // })(EditAccountForm);


import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm } from 'redux-form'



let EditAccountForm = (props) => {

    const { handleSubmit, pristine, reset, submitting } = props
    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>First Name</label>
                <div>
                    <Field name="firstName" component="input" type="text" placeholder="First Name"/>
                </div>
            </div>
            <div>
                <label>Last Name</label>
                <div>
                    <Field name="lastName" component="input" type="text" placeholder="Last Name"/>
                </div>
            </div>
            <div>
                <label>Email</label>
                <div>
                    <Field name="email" component="input" type="email" placeholder="Email"/>
                </div>
            </div>
            <div>
                <label>Sex</label>
                <div>
                    <label><Field name="sex" component="input" type="radio" value="male"/> Male</label>
                    <label><Field name="sex" component="input" type="radio" value="female"/> Female</label>
                </div>
            </div>
            <div>
                <label>Favorite Color</label>
                <div>
                    <Field name="favoriteColor" component="select">
                        <option></option>
                        <option value="ff0000">Red</option>
                        <option value="00ff00">Green</option>
                        <option value="0000ff">Blue</option>
                    </Field>
                </div>
            </div>
            <div>
                <label htmlFor="employed">Employed</label>
                <div>
                    <Field name="employed" id="employed" component="input" type="checkbox"/>
                </div>
            </div>
            <div>
                <label>Notes</label>
                <div>
                    <Field name="notes" component="textarea"/>
                </div>
            </div>
            <div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
            </div>
        </form>
    )
}

// Decorate with reduxForm(). It will read the initialValues prop provided by connect()
EditAccountForm = reduxForm({
    form: 'initializeFromState' // a unique identifier for this form
})(EditAccountForm)

// You have to connect() to any reducers that you wish to connect to yourself
EditAccountForm = connect(
    state => ({
        initialValues: state.admin.accountToEdit // pull initial values from account reducer
    })
)(EditAccountForm)

export default EditAccountForm

// export default reduxForm({
//     form: 'simple'  // a unique identifier for this form
// })(SimpleForm)
