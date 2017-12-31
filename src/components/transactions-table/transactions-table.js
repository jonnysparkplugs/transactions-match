import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import { moneyRenderer } from './renderers/transaction-money-item'
import { timeRenderer } from './renderers/transaction-time-item'
import { addressRenderer } from './renderers/transaction-address-item'
import { CandidatesModal } from '../candidates-modal/candidates-modal-connector'

export class TransactionsTable extends Component {
    _showSuggestions = (record, index) => {
        this.setState({ isModelVisible: true, selectedTransaction: record })
    }

    _closeModel = () => {
        this.setState({ isModelVisible: false })
    }

    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    render() {
        const { transactions } = this.props
        const { isModelVisible, selectedTransaction } = this.state
        return (
            <div>
                <Table columns={columns}
                       dataSource={transactions}
                       pagination={false}
                       onRow={(record, index) => ({
                           onClick: this._showSuggestions.bind(null, record, index)
                       })}
                       rowKey={record => record.id}
                />
                <CandidatesModal visible={isModelVisible}
                                 closeFn={this._closeModel}
                                 transaction={selectedTransaction}
                />
            </div>
            )
    }
}

TransactionsTable.propTypes = {
    transactions: PropTypes.array
}

const INITIAL_STATE = {
    isModelVisible: false,
    selectedTransaction: null
}

const columns = [{
    title: 'Merchant',
    dataIndex: 'merchant.name',
    key: 'name'
}, {
    title: 'Timestamp',
    dataIndex: 'timestamp',
    key: 'timestamp',
    render: timeRenderer
}, {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
    render: moneyRenderer
}, {
    title: 'Provider',
    dataIndex: 'source',
    key: 'source'
}, {
    title: 'Address',
    dataIndex: 'location.address',
    key: 'address',
    render: addressRenderer
}]

