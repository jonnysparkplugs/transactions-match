export const REQUEST_MATCH = 'REQUEST_MATCH'
export const RESPONSE_MATCH = 'RESPONSE_MATCH'

export function requestMatch(transaction, candidate) {
    return { type: REQUEST_MATCH, payload: {transaction, candidate}}
}

export function responseMatch(payload) {
    return { type: RESPONSE_MATCH, payload }
}
