'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    ImageBackground,
    Image
} from 'react-native';
import { log, logWarm, logErr } from '../utils/log'
import request from '../utils/request'
import px from '../utils/px'
import Swiper from 'react-native-swiper'
import toast from '../utils/toast'

const deviceWidth = Dimensions.get('window').width;

/**
 * Banner和快捷入口
 */
class MyBanner extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            banners: [],
            quicks: [],
            status: false,
        }
    }
    render() {
        return <View style={{ flex: 1 }}>
            {this.state.banners.length === 1 && <TouchableWithoutFeedback onPress={() => this.onPressRow(this.state.banners[0])}>
                <Image style={{
                    width: deviceWidth, height: px(480)
                }} source={{ uri: this.state.banners[0].showImg }} resizeMode="contain" resizeMethod="scale" />
            </TouchableWithoutFeedback>}
            {this.state.banners.length > 1 && <View
                style={{ height: px(480) }}>
                <Swiper autoplay={true} >
                    {this.state.banners.map((item, index) => <View key={index}>
                        <Image resizeMode="cover" resizeMethod="scale"
                            source={{ uri: item.showImg }}
                            style={{ width: px(750), height: px(480) }} />
                    </View>)}
                </Swiper>
            </View>}
            
        </View>
    }
    renderRow = (item) => {
        if (item === undefined) return null
        return <Image resizeMode="contain" resizeMethod="scale"
            source={{ uri: item.showImg }}
            style={{ width: px(750), height: px(480) }} />
    }
    componentDidMount() {
        this.refresh();
    }

    /**
     * 刷新列表内容
     */
    async refresh() {
        try {
            let res = await request.get(`/banner/findBannerAndQuickList.do?categoryId=`);
            if (res) {
                this.setState({
                    banners: res.bannerList || [],
                    quicks: res.quickList || []
                })
            }
        } catch (e) {
            toast(e.message);
        }
    }
    /**
     * 点击事件
     * @param {*} e 
     */
    onPressRow(e) {
        this.getDetail(e.contextType, e.context, e.title, e.showImg)
    }
    getDetail(type, context, title, shareImg) {
        type == 1 && this.props.navigation.navigate('DetailPage', {
            sku: context
        });
        type == 3 &&
            this.props.navigation.navigate('HtmlViewPage', {
                webPath: context,
                img: shareImg
            });
    }
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return <View style={{ flex: 1 }}>
            <View style={styles.pageView}>
                <MyBanner />
            </View>
        </View>
    }
    async componentDidMount() {

    }
}

const styles = StyleSheet.create({
    pageView: {
        flex: 1,
        width: deviceWidth,
    },
})
