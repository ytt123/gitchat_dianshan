'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity
} from 'react-native';
import Header from '../component/header'
import { observer } from "mobx-react"
import px from '../utils/px'
import CartList from '../service/cart'

//商品的样式
class GoodList extends React.Component {

    render(){
        return <View>
            <Text>测试</Text>
        </View>
    }
}

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
            {/*顶部*/}
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
                        onPress={() => { }}
                        style={styles.headerRight}>编辑</Text>
                    : null
                }
            />
            <FlatList
                keyExtractor={item => item.id}
                refreshing={this.state.refreshing}
                onRefresh={() => this.refresh()}
                ListEmptyComponent={() => {
                    if (CartList.data.list.length === 0) {
                        return <View style={styles.empty}>
                            <Text allowFontScaling={false} style={styles.empty_txt}>购物车没有商品哦</Text>
                            <TouchableOpacity activeOpacity={0.8} onPress={this.goHome.bind(this)}>
                                <View style={styles.empty_btn}>
                                    <Text allowFontScaling={false} style={styles.empty_btn_txt}>去首页看看</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    } else {
                        return <View></View>
                    }
                }}
                data={CartList.data.list}
                renderItem={({ item }) => <GoodList
                    items={item}
                    editStatus={this.state.editStatus}
                    limitStock={this.limitStock}
                    editSelectArr={this.state.editSelectArr}
                    editSelect={this.editSelect.bind(this)}
                    goodsChangeQty={this.goodsChangeQty.bind(this)}
                    changeQty={this.changeQty.bind(this)}
                    goDetail={(id, sku) => this.goDetail(id, sku)}
                />
                }
            />

        </View>
    }
    edit() { }
    editSelect() { }
    goodsChangeQty() { }
    changeQty() { }
    goDetail() { }
    goHome(){}
})

const styles = StyleSheet.create({
    headerRight: {
        color: '#858385',
        paddingVertical: px(17),
        width: px(90),
        justifyContent: 'flex-start',
        textAlign: 'right'
    },
    empty: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    empty_txt: {
        paddingTop: px(300),
        paddingBottom: px(30),
        color: '#858385',
        fontSize: px(26)
    },
    empty_btn: {
        width: px(180),
        height: px(60),
        backgroundColor: '#d0648f',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: px(6)
    },
    empty_btn_txt: {
        fontSize: px(26),
        color: '#fff'
    },
})