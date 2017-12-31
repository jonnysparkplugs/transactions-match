import { random } from 'lodash'
import { v4 as uuid } from 'uuid'
import { staticBanks } from './static/static-mock-banks'
import { staticFirms } from "./static/static-mock-firms"
import { randomDate } from "../../common/date-util"

export const buildRandomSOTWAsync = async () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const numberOfItems = random(10, 100)
            const data = []
            for (let i = 0; i < numberOfItems; ++i) {
                const bankId = random(staticBanks.length - 1)
                const bank = staticBanks[bankId]
                const firmId = random(staticFirms.length - 1)
                const firm = staticFirms[firmId]
                // random date from up to 10 mins in the past
                const dateInPast = randomDate(
                    new Date(new Date().setSeconds(-random(0, 1000))),
                    new Date())
                data.push({
                    id: uuid(),
                    owner_id: uuid(),
                    source: bank,
                    amount: random(10, 99900, true),
                    timestamp: dateInPast.toISOString(),
                    merchant: {
                        id: uuid(),
                        name: firm
                    },
                    location: {
                        id: uuid(),
                        address: '41 Luke St, London EC2A 4DP',
                        latitude: 51.5239993,
                        longitude: -0.0860359
                    }
                })
            }
            // sort by timestamps (newer appears at the start of the array)
            data.sort((a, b) => {
                return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
            })
            return resolve([...data])
        }, random(100, 1000))
    })
}

export const buildRandomCandidatesAsync = async (transaction) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const numberOfItems = random(1, 5)
            const data = []
            for (let i = 0; i < numberOfItems; ++i) {
                let nearMiss = {...transaction, owner_id: uuid(), source: 'IZETTLE'}
                const closeDate = randomDate(
                    new Date(new Date(nearMiss.timestamp).setSeconds(-random(0, 1000))),
                    new Date())
                nearMiss.timestamp = closeDate.toISOString()
                data.push(nearMiss)
            }
            // sort by timestamps (newer appears at the start of the array)
            data.sort((a, b) => {
                return new Date(b.timestamp).valueOf() - new Date(a.timestamp).valueOf()
            })
            return resolve([...data])
        }, random(100, 1000))
    })
}

export const buildMatchSuccessAsync = async (transaction, candidate) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve({transaction, candidate})
        }, random(100, 1000))
    })
}
