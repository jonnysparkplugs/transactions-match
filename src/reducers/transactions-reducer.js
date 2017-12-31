import { RESPONSE_TRANSACTIONS } from '../actions/transactions-actions'
import { RESPONSE_MATCH } from '../actions/match-actions'

export default {
    transactions
}

function transactions(state = [], action) {
    const { type, payload } = action
    switch (type) {
        case RESPONSE_TRANSACTIONS:
            return payload // we don't merge, just replace
        case RESPONSE_MATCH:
            // find the transaction and remove it
            if (state.length === 0) return state
            let indexToRemove = state.findIndex((element) => {
                return element.id === payload.transaction.id
            })
            if (indexToRemove === 0) {
                return [...state.slice(indexToRemove + 1)]
            }
            return [...state.slice(0, indexToRemove), ...state.slice(indexToRemove + 1)]
        default:
            return state
    }
}
