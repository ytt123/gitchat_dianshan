'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Image,
    Linking
} from 'react-native';
import { getHeader } from '../utils/request'
import px from '../utils/px'
import TopHeader from '../component/header'

export default class extends React.Component {

    render() {
        return <View>
            <TopHeader title="编辑地址" navigation={this.props.navigation} />
        </View>
    }
}