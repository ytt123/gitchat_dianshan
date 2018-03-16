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


class OrderList extends React.Component {
    render() {
        return <View style={{ flex: 1 }}>

        </View>
    }
}

export default class extends React.Component {
    render() {
        return <View style={{ flex: 1 }}>
            {/*头部组件*/}
            <TopHeader title="订单管理" navigation={this.props.navigation} />
            {/*列表tab*/}
            <ScrollableTabView
                initialPage={0}
                tabBarBackgroundColor="#fff"
                tabBarInactiveTextColor="#858385"
                tabBarActiveTextColor="#252426"
                tabBarUnderlineStyle={{ backgroundColor: '#e86d78', height: px(4) }}
                renderTabBar={() => <DefaultTabBar />}>
                <OrderList tabLabel="待支付" />
                <OrderList tabLabel="待收货" />
                <OrderList tabLabel="已完成" />
                <OrderList tabLabel="已退货" />
            </ScrollableTabView>
        </View>
    }
}