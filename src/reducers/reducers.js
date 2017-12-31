import { combineReducers } from 'redux'
import transactionsReducers from './transactions-reducer'
import appStatusReducers from './app-status-reducer'
import candidatesReducer from './candidates-reducer'

const rootReducer = combineReducers({
    ...transactionsReducers, ...appStatusReducers, ...candidatesReducer
})

export default rootReducer
