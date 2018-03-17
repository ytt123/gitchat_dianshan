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
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import { DialogModal } from '../component/ModalView'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return <View>
            {/*头部组件*/}
            <TopHeader title="订单详情" navigation={this.props.navigation} />
        </View>
    }
}