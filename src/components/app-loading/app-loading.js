import React from 'react'
import { Spin, Alert, Row, Col } from 'antd'
import { APP_STATUS } from '../../store/app-status'
import PropTypes from 'prop-types'

export const AppLoading = (props) => {
    const {status} = props
    return (
        <Row type="flex"
             justify="space-around"
             align="middle"
             style={appLoadingStyle}>
            <Col span={4}>
                <Spin spinning={true} size="large">
                    <Alert
                        message="Initializing..."
                        description={appStatusToFriendlyLabel(status)}
                        type="info"
                    />
                </Spin>
            </Col>
        </Row>)
}

AppLoading.propTypes = {
    status: PropTypes.string
}

const appStatusToFriendlyLabel = (appStatus) => {
    switch (appStatus) {
        case APP_STATUS.IS_INIT:
            return 'Initializing'
        case APP_STATUS.IS_LOADING:
            return 'Requesting transactions'
        case APP_STATUS.IS_LOADED:
            return 'Ready'
        case APP_STATUS.IS_ERROR:
            return 'Error'
        default:
            return '...'
    }
}

const appLoadingStyle = {
    position: 'absolute',
    margin: 'auto',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%'
}
