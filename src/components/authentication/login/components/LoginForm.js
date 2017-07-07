import React from 'react';
import {Panel} from 'react-bootstrap';

export default class LoginForm extends React.Component {
    render() {
        let content = (
            <form className="col-md-12">
                <div className="form-group">
                    <input type="text" className="form-control input-lg" placeholder="Email" />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control input-lg" placeholder="Password" />
                </div>
                <div className="form-group">
                    <button className="btn btn-primary btn-lg btn-block">Sign In</button>
                    <span><a href="#">Need help?</a></span>
                    <span className="pull-right"><a href="#">New Registration</a></span>
                </div>
            </form>
        );
        return (
            <div className="logo-panel-wrapper">
                <Panel header="Login" className="logo-panel">
                    {content}

                </Panel>
            </div>
        );
    }
}
