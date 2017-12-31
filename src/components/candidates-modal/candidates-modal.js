import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Modal, Table, message } from 'antd'
import { timeRenderer } from "../transactions-table/renderers/transaction-time-item"
import { moneyRenderer } from '../transactions-table/renderers/transaction-money-item'

export class CandidatesModal extends Component {

    constructor(props) {
        super(props)
        this.state = INITIAL_STATE
    }

    componentDidMount() {
        const { transaction, candidatesByTransactionId,
            requestCandidatesForTransaction } = this.props
        if (shouldRequestCandidates(transaction, candidatesByTransactionId)) {
            requestCandidatesForTransaction(transaction)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.transaction
            && nextProps.requestCandidatesForTransaction
            && nextProps.candidatesByTransactionId) {
            this.setState({...INITIAL_STATE})
            if (this.props.transaction !== nextProps.transaction) {
                if (shouldRequestCandidates(nextProps.transaction, nextProps.candidatesByTransactionId)) {
                    return nextProps.requestCandidatesForTransaction(nextProps.transaction)
                }
            }
        }
        if (nextProps.candidatesByTransactionId !== this.props.candidatesByTransactionId && this.state.isMatching) {
            // TODO this is not an ideal way to do this, we should probably have a collection of matched objects
            message.success(`🥇bazinga! you did it👍`)
            if (this.props.closeFn) {
                return this.props.closeFn()
            }
        }
    }

    render() {
        const { visible, closeFn, transaction,
            candidatesByTransactionId } = this.props
        const { selectedRowKeys, isMatching } = this.state
        const merchant = transaction ? transaction.merchant.name : ''
        const transactionDataProvider = []
        let candidates = []
        if (transaction) { transactionDataProvider.push(transaction) }
        // display 2nd grid or not?
        let isCandidatesAvailable = false
        if(transaction) {
            if (candidatesByTransactionId.hasOwnProperty(transaction.id)) {
                // do we have an array at the key (means we have results)
                candidates = candidatesByTransactionId[transaction.id]
                if (Array.isArray(candidates)) {
                    isCandidatesAvailable = true
                }
            }
        }
        const rowSelection = {
            selectedRowKeys,
            onChange: this._onSelectChange,
            type: 'radio'
        }
        return (
            <div>
                <Modal visible={visible}
                       title={`${merchant} - Select candidate 💳`}
                       onCancel={closeFn}
                       onOk={this._conditionallyMatch}
                       confirmLoading={isMatching}
                       width={'98vw'}
                >
                    <Table
                           columns={columns}
                           dataSource={transactionDataProvider}
                           size="small"
                           rowKey={record => record.id}
                           pagination={false}
                           showHeader={false}
                           style={transactionTableStyle}
                    />
                    <Table columns={columns}
                           dataSource={candidates}
                           size="small"
                           rowKey={record => record.owner_id}
                           pagination={false}
                           showHeader={true}
                           loading={!isCandidatesAvailable}
                           rowSelection={rowSelection}
                    />
                </Modal>
            </div>
        )
    }

    _conditionallyMatch = () => {
        const { selectedRowKeys } = this.state
        if (selectedRowKeys.length === 0) {
            message.error('Ooopppss, you need to select an candidate')
            return
        }
        const { transaction, candidatesByTransactionId,
            requestMatch } = this.props
        let candidates = candidatesByTransactionId[transaction.id]
        let index = candidates.findIndex((element) => {
            return element.owner_id === selectedRowKeys[0]
        })
        this.setState({ isMatching: true })
        requestMatch(transaction, candidates[index])
    }

    _onSelectChange = (selectedRowKeys) => {
        this.setState({ selectedRowKeys })
    }
}

CandidatesModal.propTypes = {
    visible: PropTypes.bool,
    closeFn: PropTypes.func,
    transaction: PropTypes.object,
    candidatesByTransactionId: PropTypes.object,
    requestCandidatesForTransaction: PropTypes.func,
    requestMatch: PropTypes.func
}

const INITIAL_STATE = {
    selectedRowKeys: [],
    isMatching: false
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
    key: 'address'
}]

const transactionTableStyle = {
    backgroundColor: '#d2eafb'
}

const shouldRequestCandidates = (transaction, candidatesByTransactionId) => {
    let isCandidatesAvailable = false
    let isCandidatesRequested = false
    if(transaction) {
        if (candidatesByTransactionId.hasOwnProperty(transaction.id)) {
            isCandidatesRequested = true
            // do we have an array at the key (means we have results)
            let candidates = candidatesByTransactionId[transaction.id]
            if (Array.isArray(candidates)) {
                isCandidatesAvailable = true
            }
        }
    }
    return (!isCandidatesAvailable && !isCandidatesRequested && transaction)
}
