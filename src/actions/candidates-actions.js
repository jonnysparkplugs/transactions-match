export const REQUEST_CANDIDATES_FOR_TRANSACTION = 'REQUEST_CANDIDATES_FOR_TRANSACTION'
export const RESPONSE_CANDIDATES = 'RESPONSE_CANDIDATES'

export function requestCandidatesForTransaction(transaction) {
    return { type: REQUEST_CANDIDATES_FOR_TRANSACTION, payload: transaction}
}

export function responseCandidates(transaction, candidates) {
    return { type: RESPONSE_CANDIDATES, payload: { transaction, candidates }}
}
