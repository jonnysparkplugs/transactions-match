import { connect }  from 'react-redux'
import { CandidatesModal as CandidatesModalComp } from './candidates-modal'
import { requestCandidatesForTransaction } from '../../actions/candidates-actions'
import { requestMatch } from '../../actions/match-actions'

const mapStateToProps = (state) => ({
    candidatesByTransactionId: state.candidatesByTransactionId
})

const mapDispatchToProps = (dispatch) => ({
    requestCandidatesForTransaction: (transaction) => dispatch(
        requestCandidatesForTransaction(transaction)),
    requestMatch: (transaction, candidate) => dispatch(
        requestMatch(transaction, candidate))
})

export const CandidatesModal =
    connect(mapStateToProps, mapDispatchToProps)(CandidatesModalComp)
