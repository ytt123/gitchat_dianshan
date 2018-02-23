'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    ImageBackground
} from 'react-native';
import { log, logWarm, logErr } from '../utils/log'
import request from '../utils/request'
import px from '../utils/px'
import swiper from 'react-native-swiper'

const deviceWidth = Dimensions.get('window').width;

/**
 * Banner和快捷入口
 */
class MyBanner extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            quicks: [],
            status: false,
        }
    }
    render(){
        return <View>

        </View>
    }
    componentDidMount(){

    }
    /**
     * 刷新列表内容
     */
    async refresh(){

    }
}

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
