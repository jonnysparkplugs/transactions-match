import React from 'react'
import { Tooltip } from 'antd'
import moment from 'moment/moment'

export const timeRenderer = (timestamp) => {
    return (
        <Tooltip title={moment(timestamp).format('MMMM Do YYYY, HH:mm:ss')}>
            {moment(timestamp).fromNow()}
        </Tooltip>
    )
}
