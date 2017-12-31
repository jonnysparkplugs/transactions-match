import { REQUEST_TRANSACTIONS,
    responseTransactions } from '../../actions/transactions-actions'
import { REQUEST_CANDIDATES_FOR_TRANSACTION,
    responseCandidates } from '../../actions/candidates-actions'
import { REQUEST_MATCH, responseMatch } from '../../actions/match-actions'
import { buildRandomSOTWAsync, buildRandomCandidatesAsync,
    buildMatchSuccessAsync } from './mock-server'

export const mockMiddleware = ({ dispatch }) => next => action => {
    // we can dispatch dispatch our own redux actions using the dispatch
    // function here. As we aren't using 'fetch' as we wont to mock our
    // api.
    const { type } = action
    switch (type) {
        case REQUEST_TRANSACTIONS: {
            buildRandomSOTWAsync()
                .then((response) => {
                    dispatch(responseTransactions(response))
                })
            break
        }
        case REQUEST_CANDIDATES_FOR_TRANSACTION: {
            let transaction = action.payload
            buildRandomCandidatesAsync(transaction)
                .then((candidates) => {
                    dispatch(responseCandidates(transaction, candidates))
                })
            break
        }
        case REQUEST_MATCH: {
            buildMatchSuccessAsync(action.payload.transaction, action.payload.candidate)
                .then((successObj) => {
                    dispatch(responseMatch(successObj))
                })
            break
        }
        default: {
            break
        }
    }
    next(action)
}
