'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground,
    Image,
    Platform
} from 'react-native';
import { log, logWarm, logErr } from '../utils/log'
import request from '../utils/request'
import px from '../utils/px'
import toast from '../utils/toast'

export default class extends React.Component {

    static defaultProps = {
        title : ""
    }
    render() {
        return <View style={topStyles.header}>
            {Platform.OS == 'ios' && <View style={topStyles.topBox}></View>}
            <View style={[topStyles.bar, this.props.boxStyles]}>
                <View style={topStyles.leftBtn}>
                    <TouchableOpacity style={topStyles.back}
                        onPress={() => this.props.navigation.goBack()}>
                        <View style={{ height: px(60), justifyContent: "center" }}>
                            <Image source={{ uri: require('../images/icon-back') }}
                                style={{ width: px(40), height: px(40) }} />
                        </View>
                    </TouchableOpacity>
                    {this.props.leftBtn}
                </View>
                <Text style={topStyles.title}>{this.props.title}</Text>
                <View style={topStyles.rightBtn}>
                    {this.props.rightBtn}
                </View>
            </View>
        </View>
    }
}
const topStyles = StyleSheet.create({
    header: {
        backgroundColor: '#fbfafc',
        width: px(750)
    },
    topBox: {
        width: px(750),
        height: px(20)
    },
    bar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        borderBottomColor: "#ddd",
        borderBottomWidth: 1,
        height: px(90),
        paddingTop: px(10)
    },
    title: {
        flex: 1,
        fontSize: px(30),
        textAlign: "center",
        color: "#252426"
    },
});