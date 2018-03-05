'use strict';

import React from 'react';
import {
    StyleSheet,
    Image,
    View,
    WebView
} from 'react-native';

import Header from '../component/header'
import { log, logWarm, logErr } from '../utils/log'


export default class extends React.Component {

    constructor(props) {
        super(props);
        let urls = decodeURIComponent(this.props.navigation.state.params.webPath || '');
        if (urls.indexOf('?') > 0) {
            urls += '&t=' + Date.now();
        } else {
            urls += '?t=' + Date.now();
        }
        this.state = {
            webpath: urls,
            title: ''
        }
    }
    render() {
        return <View style={{ flex: 1 }}>
            <Header title={this.state.title} navigation={this.props.navigation} />
            <WebView
                //添加一个引用
                ref="webview"
                //设置浏览地址
                source={{ uri: this.state.webpath }}
                //启用安卓的js功能
                javaScriptEnabled={true}
                //正常的滚动停止速度
                decelerationRate="normal"
                //允许https和http一起使用
                mixedContentMode="always"
                //显示loading动画
                startInLoadingState={true}
                //开启缩放
                scalesPageToFit={true}
                //网页互动消息通知
                onMessage={(t) => this.onMessage(t)}
                onNavigationStateChange={(e) => this.webChange(e)}
                onLoad={(e) => {
                    this.loaded()
                    log('网页加载成功', e.nativeEvent)
                }}
                onError={(e) => {
                    log('网页加载失败', e.nativeEvent)
                }} />
        </View>
    }
    //网页加载成功之后
    loaded() {

    }
    //网页回调消息到APP
    onMessage() {

    }
    //网页跳转
    webChange(event) {
        if (!event || !event.title) return;
        if (event.title.indexOf("http") < 0 && event.title.indexOf("about:") < 0) {
            this.setState({
                title: event.title
            });
        }
    }
}