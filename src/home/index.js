'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions
} from 'react-native';
import { log, logWarm, logErr } from '../utils/log'
import request from '../utils/request'
import px from '../utils/px'

const deviceWidth = Dimensions.get('window').width;



export default class extends React.Component {
    render() {
        return <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <View style={styles.pageView}>
                
            </View>
        </View>
    }
    async componentDidMount(){
       
    }
}

const styles=StyleSheet.create({
    pageView: {
        flex: 1,
        width: deviceWidth
    },
})
