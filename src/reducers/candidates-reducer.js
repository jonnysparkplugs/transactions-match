import { RESPONSE_CANDIDATES, 
    REQUEST_CANDIDATES_FOR_TRANSACTION } from '../actions/candidates-actions'
import { RESPONSE_MATCH } from '../actions/match-actions'

export default {
    candidatesByTransactionId
}

function candidatesByTransactionId(state = {}, action) {
    // we shallow copy the object in the reducer. Should be fine
    // as its readonly (just rendered).
    const { type, payload } = action
    switch (type) {
        case REQUEST_CANDIDATES_FOR_TRANSACTION:
            return {...state, [payload.id]: null }
        case RESPONSE_CANDIDATES:
            return {...state, [payload.transaction.id]: payload.candidates }
        case RESPONSE_MATCH:
            let cpy = {...state}
            delete cpy[payload.transaction.id]
            return cpy
        default:
            return state
    }
}
