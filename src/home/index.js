'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    ImageBackground,
    Image,
    FlatList
} from 'react-native';
import { log, logWarm, logErr } from '../utils/log'
import request from '../utils/request'
import px from '../utils/px'
import Swiper from 'react-native-swiper'
import toast from '../utils/toast'
// import FastImage from 'react-native-fast-image'
import Modules from './floor_modules'

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
            {this.state.banners.length === 1 && <TouchableWithoutFeedback
                onPress={() => this.onPressRow(this.state.banners[0])}>
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
            {this.state.quicks.length > 0 && <View style={bannerStyle.box}>
                <ImageBackground resizeMode="cover" resizeMethod="scale"
                    style={bannerStyle.container} source={{ uri: require('../images/shop-quick-bottom') }}>
                    {this.state.quicks.map((item, index) => <TouchableWithoutFeedback
                        key={item.quickEntranceId} onPress={() => this.goPage(item)}>
                        <View style={bannerStyle.imgbox}>
                            <Image resizeMode="contain" resizeMethod="scale"
                                source={{ uri: item.showImg }}
                                style={bannerStyle.img} />
                            <Text style={bannerStyle.txt}>{item.title}</Text>
                        </View>
                    </TouchableWithoutFeedback>)}
                </ImageBackground>
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
    /**
     * 跳转到其他页面
     * @param {*} type 
     * @param {*} context 
     * @param {*} title 
     * @param {*} shareImg 
     */
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

const bannerStyle = StyleSheet.create({
    box: {
        position: "relative",
        width: px(750),
        height: px(210),
    },
    container: {
        position: "absolute",
        left: px(10),
        right: px(10),
        top: px(-44),
        bottom: 0,
        height: px(250),
        width: px(730),
        paddingHorizontal: px(37),
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-around',
    },
    imgbox: {
        alignItems: 'center',
        width: px(164),
    },
    img: {
        width: px(164),
        height: px(155)
    },
    txt: {
        marginTop: px(14),
        fontSize: px(22),
        color: "#252426"
    },
})



export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadText: "加载中...",
            list: [],
            refreshing: false, //列表刷新用到的变量
        }
    }

    render() {
        return <View style={{ flex: 1 }}>
            <View style={styles.pageView}>
                <FlatList ref="flatlist"
                    refreshing={this.state.refreshing}
                    numColumns={2}//2列
                    onRefresh={() => this.refresh()}//刷新调用的方法
                    onEndReached={() => this.nextPage()}//拉倒底部加载下一页
                    ListHeaderComponent={<View style={{ backgroundColor: "#fff" }}>
                        <MyBanner />
                        <Modules
                            navigation={this.props.navigation}
                            goOtherPage={this.goOtherPage.bind(this)} />
                        <View style={{
                            height: px(100),
                            backgroundColor: '#f2f2f2',
                            paddingLeft: px(20)
                        }}>
                            <Image
                                style={{
                                    height: px(100),
                                    width: px(280)
                                }}
                                source={{ uri: require('../images/index-title') }}
                            />
                        </View>
                    </View>}
                    renderItem={() => { }}
                    ListFooterComponent={<View>
                        <Text style={styles.loading}>{this.state.loadText}</Text>
                    </View>}
                    onScroll={(e) => this._onScroll(e.nativeEvent)}
                    scrollEventThrottle={1}
                    keyExtractor={(goods) => goods.id}
                    data={this.state.list}
                />

            </View>
        </View>
    }
    async componentDidMount() {

    }
    refresh() {

    }
    nextPage() {

    }
    _onScroll() {

    }
    /**
     * 跳转到其他页面
     * @param {*} item 
     */
    goOtherPage(item) {
        if (item.urlType == "sku" && item.prodId) {
            this.props.navigation.navigate('DetailPage', {
                id: item.prodId
            });
        }
        if (item.urlType == "h5") {
            this.props.navigation.navigate('HtmlViewPage', {
                webPath: item.urlTypeValue,
                img: item.imageUrl
            });
        }
    }
}

const styles = StyleSheet.create({
    pageView: {
        flex: 1,
        width: deviceWidth,
    },
    loading: {
        textAlign: 'center',
        fontSize: px(28),
        color: "#ccc"
    },
})
