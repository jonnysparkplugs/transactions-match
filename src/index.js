import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { initial_state } from './store/store'
import reducer from './reducers/reducers'
import { mockMiddleware } from './middleware/mock-middleware/mock-middleware'
import { App } from './components/app/app-connector'

const store = createStore(
    reducer,
    initial_state,
    composeWithDevTools(applyMiddleware(mockMiddleware)) // TODO remove devtools in CI
)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root'))
