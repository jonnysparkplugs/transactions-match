import { APP_STATUS } from '../store/app-status'
import { REQUEST_TRANSACTIONS,
    RESPONSE_TRANSACTIONS } from '../actions/transactions-actions'

export default {
    appStatus
}

function appStatus(state = APP_STATUS.IS_INIT, action) {
    const { type } = action
    switch (type) {
        case REQUEST_TRANSACTIONS:
            return APP_STATUS.IS_LOADING
        case RESPONSE_TRANSACTIONS:
            return APP_STATUS.IS_LOADED
        default:
            return state
    }
}
