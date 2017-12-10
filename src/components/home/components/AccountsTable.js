import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';

export default class AccountsTable extends React.Component {

    render() {

        const {accounts:{error, data}} = this.props;
        return (
            <BootstrapTable data={data} striped hover condensedr>
                <TableHeaderColumn isKey dataField="email">Email</TableHeaderColumn>
                <TableHeaderColumn dataField="firstName">First name</TableHeaderColumn>
                <TableHeaderColumn dataField="lastName">Last name</TableHeaderColumn>
            </BootstrapTable>
        )
    }
}