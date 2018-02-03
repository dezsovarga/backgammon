import React from 'react';
import classNames from 'classnames';
import * as CONSTANTS from './constants';

class ValidationField extends React.Component {

    getFeedback() {
        const { feedback } = this.props;
        return (
            <label
                className="feedback clickable-text"
                onClick={() => {
                    return this.props.feedbackHandler ? this.props.feedbackHandler() : null;
                }}
            >
                {feedback}
            </label>
        );
    }

    render() {
        let content = null;
        const {error, touched, feedback} = this.props;
        const inputClass = classNames(
            this.props.className,
            {
                'validate-form-control': true,
                'has-error': error && touched,
                'has-feedback': !!feedback
            }
        );
        let control;
        switch (this.props.fieldType) {
            case CONSTANTS.INPUT:
                control = <input className="form-control" {...this.props} />;
                break;
            case CONSTANTS.TEXTAREA:
                control = <textarea {...this.props} />;
                break;

            default:
                control = <input {...this.props} />;
                break;
        }

        content = (
            <div className={inputClass}>
                {control}
                {touched && error && <label className="error truncate">{error}</label>}
                {feedback && this.getFeedback()}
            </div>
        );
        return content;
    }
}

export default ValidationField;
