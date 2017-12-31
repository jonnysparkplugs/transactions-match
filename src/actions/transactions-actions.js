export const REQUEST_TRANSACTIONS = 'REQUEST_TRANSACTIONS'
export const RESPONSE_TRANSACTIONS = 'RESPONSE_TRANSACTIONS'

export function requestTransactions() {
    return { type: REQUEST_TRANSACTIONS }
}

export function responseTransactions(transactions) {
    return { type: RESPONSE_TRANSACTIONS, payload: transactions }
}
