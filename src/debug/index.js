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
import { getLogs } from '../utils/log'

export default class extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            logs: []
        }
    }
    render() {
        return <View style={{ flex: 1 }}>
            {/*顶部组件*/}
            <TopHeader title='日志列表' navigation={this.props.navigation} />
            {/*日志简略信息列表*/}
            <ScrollView style={styles.container}>
                <View style={styles.logs}>
                    {this.state.logs.map((item, index) =>
                        <TouchableWithoutFeedback key={index} onPress={() => this.show(index)}>
                            <View style={styles.line}>
                                {item[2] && <Text allowFontScaling={false} style={styles.rowTxt}>{item[0] + item[2]}</Text>}
                                {!item[2] && <Text allowFontScaling={false} style={styles.rowTxt}>{item[0]}</Text>}
                            </View>
                        </TouchableWithoutFeedback>
                    )}
                </View>
            </ScrollView>
        </View>
    }
    componentDidMount() {
        let logs = getLogs();
        this.setState({
            logs: logs
        });
    }
    show(id) {
        this.props.navigation.navigate('Log', { id });
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f5f3f6',
        flex: 1
    },
    title: {
        margin: px(10)
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
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: px(26),
        paddingBottom: px(26),
        paddingLeft: px(30),
        paddingRight: px(30),
        marginBottom: px(1),
        backgroundColor: '#fff'
    },
    rowLabel: {
        color: '#222',
        fontSize: px(28)
    },
    rowInput: {
        height: px(50),
        padding: px(10),
        width: px(500),
        borderColor: '#ccc',
        borderWidth: px(1)
    },
    rowBtn: {
        color: '#fff',
        fontSize: px(25),
        backgroundColor: '#eb83b2',
        padding: px(10)
    },
    rowTxt: {
        color: '#858385',
        fontSize: px(25)
    },
    headImg: {
        width: px(120),
        height: px(120),
        borderRadius: px(60)
    }
});