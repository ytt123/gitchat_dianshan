'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import Header from '../component/header'
import { observer } from "mobx-react"
import px from '../utils/px'
import CartList from '../service/cart'

export default observer(class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            txt: '编辑',
            requestStatue: false, //请求状态  是否请求中
            refreshing: false, //下拉刷新状态
            editStatus: false, //编辑状态
            selectAllStatus: false,
            editSelectAllStatus: false,
            SelectArr: [],
            editSelectArr: [],
            list: []
        };
        this.edit = this.edit.bind(this);
    }
    render() {
        return <View style={{ flex: 1, backgroundColor: '#f5f3f6', paddingBottom: px(100) }}>
            <Header
                showLeft={false}
                style={{
                    backgroundColor: "#fff",
                }}
                title={`购物车(${CartList.data.goods_count || 0})`}
                titleStyle={{
                    color: "#000"
                }}
                rightBtn={CartList.data.list.length > 0 ?
                    <Text allowFontScaling={false}
                        onPress={() => DeviceEventEmitter.emit('rightNameCart')}
                        style={{ color: !this.props.navigation.state.params || this.props.navigation.state.params.rightName == '编辑' ? '#d0648f' : '#858385', paddingVertical: px(17), width: px(90), justifyContent: 'flex-start', textAlign: 'right' }}>{this.props.navigation.state.params && this.props.navigation.state.params.rightName || '编辑'}</Text>
                    : null
                }
            />
        </View>
    }
    edit(){}
})