import { connect }  from 'react-redux'
import { TransactionsTable as TransactionsTableComp } from './transactions-table'


const mapStateToProps = (state) => ({
    transactions: state.transactions
})

const mapDispatchToProps = (dispatch) => ({

})

export const TransactionsTable =
    connect(mapStateToProps, mapDispatchToProps)(TransactionsTableComp)
