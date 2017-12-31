import { APP_STATUS } from './app-status'

export const initial_state = {
    appStatus: APP_STATUS.IS_INIT,
    transactions : [],
    candidatesByTransactionId : {} // using object not Map, easier to handle with Redux
}
