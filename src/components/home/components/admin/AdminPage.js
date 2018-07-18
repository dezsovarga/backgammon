import React from 'react';
import AccountsTable from './AccountsTable';
import EditAccount from "./EditAccountForm";


export default class AdminPage extends React.Component {

    handleEditAccount(editAccountData) {
        console.log("handle edit account form");
    }

    getContent(adminView) {
        let content;
        switch(adminView) {
            case "edit":
                content =
                    (<EditAccount
                        onSubmit={this.handleEditAccount}
                        {...this.props}
                    />);
                break;

            case "accountsList":
                content =
                    (<AccountsTable
                        accounts={this.props.accounts}
                        {...this.props}
                    />);
                break;

            default:
                content =
                    (<AccountsTable
                        accounts={this.props.accounts}
                        {...this.props}
                    />);
        }
        return content;
    }

    render() {

        const { admin: {currentAdminView}} = this.props;
        const content = this.getContent(currentAdminView);

        return (
            <div className="row">
                <div className="leftcolumn">
                    <div className="home_page">
                        <div className="welcome_section">
                            <h2 className="title_text">Admin Page</h2>
                            {content}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}