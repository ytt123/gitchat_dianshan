'use strict';

import React, { PureComponent } from 'react';
import {
    Modal, Text, View, StyleSheet,
    TouchableOpacity, Image,
    NativeModules, Clipboard, Animated,
    TouchableWithoutFeedback, CameraRoll, Platform
} from 'react-native'

import px from '../utils/px'
import toast from '../utils/toast'


export default class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isShow: true,//默认不显示弹层
            boxY: 0,
        }
        this.list = []
    }
    render() {
        return <Modal style={styles.view}
            onRequestClose={() => { }}
            animationType="none"
            transparent={true}
            visible={this.state.isShow}>
            <TouchableWithoutFeedback onPress={() => this.cancel()}>
                <View style={styles.bg} ></View>
            </TouchableWithoutFeedback>
            <Animated.View style={[styles.box, {
                transform: [
                    { translateY: this.state.boxY }
                ]
            }]}>
                {/*标题*/}
                <View style={styles.titleBox}>
                    {this.props.children || <Text style={styles.tit}>分享到</Text>}
                </View>
                {/*分享按钮*/}
                <View style={styles.list}>
                    {this.list.map(item => item)}
                </View>
                {/*取消按钮*/}
                <TouchableOpacity
                    style={styles.cancelBtn}
                    onPress={() => this.cancel()}>
                    <Text style={styles.cancelTxt}>取消</Text>
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    }
    //关闭弹层
    cancel() {
        this.setState({ isShow: false })
    }
}
const styles = StyleSheet.create({
    view: {
        flex: 1
    },
    bg: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.5)',
    },
    box: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: px(750),
        backgroundColor: '#fff'
    },
    titleBox: {
        paddingHorizontal: px(20),
        paddingTop: px(20),
        alignItems: 'center',
    },
    tit: {
        fontSize: px(22)
    },
    cancelBtn: {
        width: px(750),
        padding: px(20),
        justifyContent: 'center',
        backgroundColor: '#efefef'
    },
    cancelTxt: {
        fontSize: px(36),
        textAlign: 'center'
    },
    list: {
        height: px(250),
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: px(50),
        paddingRight: px(50)
    },
})