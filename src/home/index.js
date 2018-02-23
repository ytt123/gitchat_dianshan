'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import { log, logWarm, logErr } from '../utils/log'
import request from '../utils/request'
import px from '../utils/px'

export default class extends React.Component {
    render() {
        return <View style={{ marginTop: px(500) }}>
            <Text>这是首页</Text>
        </View>
    }
}
