import { connect }  from 'react-redux'
import { App as AppComp } from './app'
import { requestTransactions } from '../../actions/transactions-actions'

const mapStateToProps = (state) => ({
    appStatus: state.appStatus
})

const mapDispatchToProps = (dispatch) => ({
    requestTransactions: () => dispatch(requestTransactions())
})

export const App =
    connect(mapStateToProps, mapDispatchToProps)(AppComp)
