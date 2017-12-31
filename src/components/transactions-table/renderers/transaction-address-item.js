import React from 'react'

const GOOGLE_MAPS_QUERY_URL = 'https://www.google.com/maps/search/?api=1&query='

export const addressRenderer = (address) => {
    return (<a href={`${GOOGLE_MAPS_QUERY_URL}${encodeURIComponent(address)}`}>{address}</a>)
}
