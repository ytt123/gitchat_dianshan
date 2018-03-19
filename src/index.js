'use strict';

import React from 'react';
import {
    StyleSheet,
    Image
} from 'react-native';
//添加路由组件
import Navigation from 'react-navigation';
import CartList from './service/cart'

//添加展示用的首页
import Home from './home/index'
import Products from './home/products'
import Shop_Cart from './home/shop_cart'
import My from './home/my'
import Goods from './detail/goods'
import Browser from './home/browser'
import Setting from './center/setting'
import Debugs from './debug/index'
import Log from './debug/log'
import Login from './account/login'
import Submit from './order/submit'
import AddressList from './center/addressList'
import AddressEdit from './center/addressEdit'
import Success from './order/success'
import OrderList from './order/list'
import OrderDetail from './order/detail'

//创建tab页的顶部样式
const styles = StyleSheet.create({
    tab: {
        height: 45,
        backgroundColor: '#fbfafc',
        borderTopColor: '#efefef'
    },
    tabIcon: {
        width: 20,
        height: 20
    },
    tabLabel: {
        marginBottom: 4
    }
})

//创建首页的tab页
const Tabs = Navigation.TabNavigator({
    'Home': {
        screen: Home,
        navigationOptions: ({ navigation, screenProps }) => {
            return {
                tabBarLabel: '首页',
                tabBarIcon: (opt) => {
                    if (opt.focused) return <Image source={{ uri: require('./images/tab-home-active') }} style={styles.tabIcon}></Image>;
                    return <Image source={{ uri: require('./images/tab-home') }} style={styles.tabIcon}></Image>;
                }
            }
        }
    },
    'Products': {
        screen: Products,
        navigationOptions: ({ navigation, screenProps }) => {
            return {
                tabBarLabel: '产品分类',
                tabBarIcon: (opt) => {
                    if (opt.focused) return <Image source={{ uri: require('./images/tab-products-active') }} style={styles.tabIcon}></Image>;
                    return <Image source={{ uri: require('./images/tab-products') }} style={styles.tabIcon}></Image>;
                }
            }
        }
    },
    'Shop_Cart': {
        screen: Shop_Cart,
        navigationOptions: ({ navigation, screenProps }) => {
            return {
                tabBarLabel: '购物车',
                tabBarIcon: (opt) => {
                    if (opt.focused) return <Image source={{ uri: require('./images/tab-shop-cart-active') }} style={styles.tabIcon}></Image>;
                    return <Image source={{ uri: require('./images/tab-shop-cart') }} style={styles.tabIcon}></Image>;
                }
            }
        }
    },
    'My': {
        screen: My,
        navigationOptions: ({ navigation, screenProps }) => {
            return {
                tabBarLabel: '个人中心',
                tabBarIcon: (opt) => {
                    if (opt.focused) return <Image source={{ uri: require('./images/tab-my-active') }} style={styles.tabIcon}></Image>;
                    return <Image source={{ uri: require('./images/tab-my') }} style={styles.tabIcon}></Image>;
                },
                //tab点击事件
                tabBarOnPress: ({ scene, jumpToIndex, previousScene }) => {
                    if (!scene.focused) {
                        jumpToIndex(scene.index);
                    }
                }
            }
        }
    }
}, {
        // initialRouteName:'Home', //初始化显示的页面,默认第一个
        // animationEnabled: true, //是否显示切换动画
        tabBarComponent: Navigation.TabBarBottom,
        lazy: true,
        tabBarPosition: 'bottom',
        tabBarOptions: {
            style: styles.tab,
            labelStyle: styles.tabLabel,
            activeTintColor: '#d0648f'
        }
    });


//创建路由
const Pages = Navigation.StackNavigator({
    'Tabs': {
        screen: Tabs
    },
    'Goods': {
        screen: Goods
    },
    'Browser': {
        screen: Browser
    },
    'Setting': {
        screen: Setting
    },
    'Debugs': {
        screen: Debugs
    },
    'Log': {
        screen: Log
    },
    'Login': {
        screen: Login
    },
    'Submit': {
        screen: Submit
    },
    'AddressList': {
        screen: AddressList
    },
    'AddressEdit':{
        screen: AddressEdit
    },
    'Success':{
        screen: Success
    },
    'OrderList':{
        screen: OrderList
    },
    'OrderDetail':{
        screen: OrderDetail
    }
}, {
        // initialRouteName:'OrderDetail',
        //这里做了一个页面跳转的动画
        transitionConfig: () => ({
            screenInterpolator: sceneProps => {
                const { layout, position, scene } = sceneProps;
                const { index } = scene;
                const translateX = position.interpolate({
                    inputRange: [index - 1, index, index + 1],
                    outputRange: [layout.initWidth, 0, 0]
                });
                const opacity = position.interpolate({
                    inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
                    outputRange: [0, 1, 1, 0.3, 0]
                });
                return { opacity, transform: [{ translateX }] };
            }
        }),
        navigationOptions: {
            header: null
        }
    });

//创建一个自己的容器,方便以后对路由做一些处理
export default class extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <Pages onNavigationStateChange={this.listenChange.bind(this)}></Pages>;
    }
    componentDidMount() {
        CartList.init();
    }
    //监听路由的跳转
    listenChange(state1, state2, action) {

    }
}