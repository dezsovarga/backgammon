import React from 'react';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import {switchAdminView} from "./actions";

export default class AccountsTable extends React.Component {

    onRowClick(row) {
        console.log(row);
        const {dispatch} = this.props;
        dispatch(switchAdminView("edit", row));
    }

    render() {

        const options = {
            onRowClick: this.onRowClick.bind(this)
        };

        const {accounts:{error, data}} = this.props;
        return (
            <BootstrapTable data={data} striped hover condensedr search options={options}>
                <TableHeaderColumn  width="5%" isKey dataField="id">Id</TableHeaderColumn>
                <TableHeaderColumn dataField="email">Email</TableHeaderColumn>
                <TableHeaderColumn dataField="firstName">First name</TableHeaderColumn>
                <TableHeaderColumn dataField="lastName">Last name</TableHeaderColumn>
                <TableHeaderColumn dataField="rating">Rating</TableHeaderColumn>
                <TableHeaderColumn dataField="active">Active</TableHeaderColumn>
            </BootstrapTable>
        );
    }
}