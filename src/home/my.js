'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    Image
} from 'react-native';
import TopHeader from '../component/header'
import px from '../utils/px'

export default class extends React.Component {
    render() {
        return <View style={{ flex: 1 }}>
            <ScrollView style={{ flex: 1 }}>
                <TopHeader title='个人中心'
                    boxStyles={{ backgroundColor: "#d0648f" }}
                    textStyle={{ color: '#fff' }}
                    rightBtn={<TouchableOpacity>
                        <Image
                            style={{ width: px(42), height: px(42) }}
                            source={{ uri: require('../images/icon-setting') }} />
                    </TouchableOpacity>}
                    showLeft={false} />
            </ScrollView>
        </View>
    }
}