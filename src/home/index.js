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
import storage from '../utils/Storage'

export default class extends React.Component {
    render() {
        return <View style={{ marginTop: px(500) }}>
            <Text>这是首页</Text>
        </View>
    }
    async componentDidMount(){
        // storage.setItem('a',234)
        let res=await storage.getItem('a')
        log(res)
    }
}
