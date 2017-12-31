import numeral from 'numeral'

export const moneyRenderer = (amount) => {
    return (`£ ${numeral(amount).format('0,0.00')}`)
}
