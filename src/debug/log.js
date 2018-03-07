'use strict';

import React from 'react';

import {
    View,
    Text,
    Image,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableWithoutFeedback,
} from 'react-native';
import { getHeader } from '../utils/request'
import px from '../utils/px'
import TopHeader from '../component/header'
import { getLog } from '../utils/log'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.navigation.state.params.id || 0,
            logs: []
        };
    }
    render() {
        return <View style={{ flex: 1 }}>
            <TopHeader title='日志' navigation={this.props.navigation} />
            <ScrollView style={styles.container}>
                <View style={styles.logs}>
                    {this.state.logs.map((item, index) =>
                        <View style={styles.line} key={index}>
                            <Text allowFontScaling={false} style={styles.rowTxt}>{item}</Text>
                        </View>
                    )}
                </View>
            </ScrollView>
        </View>
    }
    componentDidMount() {
        let logs = getLog(this.state.id);
        if (!logs || logs.constructor !== Array) return;
        let list = []
        list = logs.map(item => {
            if (typeof (item) === "string") return item;
            return JSON.stringify(item);
        })
        this.title = list.shift();
        this.setState({
            logs: list
        });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f3f6',
        flex: 1
    },
    logs: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff'
    },
    line: {
        borderBottomWidth: px(1),
        width: px(750),
        padding: px(10)
    },
    rowTxt: {
        color: '#858385',
        fontSize: px(25)
    },
});