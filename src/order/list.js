'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    TextInput,
    ScrollView,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
import TopHeader from '../component/header'
import px from '../utils/px'
import request from '../utils/request'
import { pay, isWXAppInstalled } from 'react-native-wechat';
import toast from '../utils/toast';

export default class extends React.Component {
    render() {
        return <View style={{ flex: 1 }}>
            <TopHeader title="订单管理" navigation={this.props.navigation} />

        </View>
    }
}