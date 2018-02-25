'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground,
    Image
} from 'react-native';
import { log, logWarm, logErr } from '../utils/log'
import request from '../utils/request'
import px from '../utils/px'
import toast from '../utils/toast'
import Header from '../component/header'

export default class extends React.Component{

    render(){
        return <View>
            <Header navigation={this.props.navigation} title="详情页" />
            <Text>展示详情页</Text>
        </View>
    }
}