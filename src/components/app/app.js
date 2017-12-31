import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { APP_STATUS } from '../../store/app-status'
import { AppLoading } from '../app-loading/app-loading'
import { TransactionsTable } from '../transactions-table/transactions-table-connector'
import './app.css'

export class App extends Component {

    componentDidMount() {
        const { requestTransactions } = this.props
        requestTransactions()
    }

    render() {
        const { appStatus } = this.props
        if (appStatus === APP_STATUS.IS_LOADING) { return <AppLoading status={appStatus}/>
        } else if (appStatus === APP_STATUS.IS_LOADED) { return <TransactionsTable />
        } else if (appStatus === APP_STATUS.IS_ERROR) { return <AppLoading status={appStatus}/>
        } else { return <AppLoading status={appStatus} />
        }
    }
}

App.propTypes = {
    appStatus: PropTypes.string,
    requestTransactions: PropTypes.func
}
