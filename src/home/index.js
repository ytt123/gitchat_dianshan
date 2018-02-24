'use strict';

import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableWithoutFeedback,
    TouchableOpacity,
    ImageBackground,
    Image,
    FlatList,
    Platform
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
    //渲染单行
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
// 价格，整数小数字体大小不一样
function spliceNum(price) {
    let p_int = (price + '').split('.')[0]
    let p_float = ((price * 1 - p_int * 1).toFixed(2) + '').split('.')[1]
    return [p_int, p_float]
}

//单个商品组件
class GoodItem extends React.Component {
    render() {
        const { index, goods } = this.props
        return (
            <View style={goodStyles.goodsBox}>
                <View style={[goodStyles.goods, {
                    borderTopLeftRadius: index % 2 === 0 ? px(0) : px(12),
                    borderTopRightRadius: index % 2 === 0 ? px(12) : px(0),
                    borderBottomLeftRadius: index % 2 === 0 ? px(0) : px(12),
                    borderBottomRightRadius: index % 2 === 0 ? px(12) : px(0),
                }]}>
                    <View style={[goodStyles.goods_]}>
                        <TouchableOpacity
                            activeOpacity={0.9}
                            key={goods.id}
                            onPress={() => this.getDetail()}>
                            <View>
                                <Image
                                    resizeMethod="scale"
                                    source={{ uri: goods.specImage1 }}
                                    style={goodStyles.goodsCover}
                                />
                                {this.props.goods.limitStock == 0
                                    ? <View style={goodStyles.goods_img_cover}>
                                        <Text allowFontScaling={false} style={goodStyles.goods_img_txt}>抢光了</Text>
                                    </View>
                                    : null
                                }
                                <View style={goodStyles.labels}>
                                    {goods.labelList && goods.labelList.length > 0 && goods.labelList.map((item) =>
                                        <Image key={item.labelId} resizeMode="contain" resizeMethod="scale"
                                            style={[goodStyles.labelImg, { width: px(item.width), height: px(item.height) }]}
                                            source={{ uri: item.labelLogo }} />
                                    )}
                                </View>
                            </View>
                            <View style={goodStyles.sessionName}>
                                <View style={goodStyles.goodsShowNameBox}>
                                    <Text allowFontScaling={false}
                                        numberOfLines={1}
                                        style={goodStyles.goodsShowName}>
                                        {goods.goodsShowName}
                                    </Text>
                                </View>
                                <View style={goodStyles.goodsShowDesc_}>
                                    {
                                        (goods.isInBond == 1 || goods.isForeignSupply == 2) &&
                                        <View
                                            style={[goodStyles.flag_, goods.isInBond == 1 ? goodStyles.flagB : goodStyles.flagZ]}>
                                            <Text
                                                style={goodStyles.flagTxt}
                                                allowFontScaling={false}>
                                                {goods.isInBond == 1 ? '保税' : goods.isForeignSupply == 2 ? '直邮' : ''}
                                            </Text>
                                        </View>
                                    }
                                    <Text style={goodStyles.goodsShowDesc} allowFontScaling={false}
                                        numberOfLines={2}>
                                        {
                                            (goods.isInBond == 1 || goods.isForeignSupply == 2) &&
                                            <Text style={goodStyles.flag}
                                                allowFontScaling={false}>{goods.isInBond == 1 ? '保税' : '直邮'}    </Text>
                                        }
                                        {goods.goodsShowDesc}
                                    </Text>
                                </View>
                            </View>

                            <View style={[goodStyles.sessionNoName, goodStyles.sessionNoNameBig, { alignItems: 'center' }]}>
                                <View style={[goodStyles.sessionPrice, { flexDirection: 'column', alignItems: 'flex-start' }]}>
                                    <Text allowFontScaling={false}
                                        style={goodStyles.salePrice}>
                                        ￥
                                            <Text allowFontScaling={false}
                                            style={goodStyles.salePrice_}>
                                            {spliceNum(goods.salePrice)[0]}
                                        </Text>.{spliceNum(goods.salePrice)[1]}
                                    </Text>
                                    <Text allowFontScaling={false}
                                        style={goodStyles.marketPrice}>
                                        ￥{goods.marketPrice}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={goodStyles.cartCBorder}
                                    activeOpacity={0.8}
                                    onPress={() => this.props.addCart(goods.id, 1)}>
                                    <View style={goodStyles.cartC}>
                                        <Image
                                            resizeMode="cover"
                                            source={{ uri: require('../images/icon-indexCart') }}
                                            style={goodStyles.cart} />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    //跳转商品详情页
    getDetail() {
        this.props.navigation.navigate('DetailPage', {
            id: this.props.goods.sku ? '' : this.props.goods.id,
            sku: this.props.goods.sku
        });
    }
}
const goodStyles = StyleSheet.create({
    goodsBox: {},
    goods: {
        width: px(367),
        marginRight: px(16),
        marginBottom: px(16),
        overflow: 'hidden',
    },
    goods_: {
        width: px(367),
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingBottom: px(24)
    },
    goodsCover: {
        width: px(367),
        height: px(367),
        position: 'relative',
        zIndex: 0,
        overflow: 'hidden'
    },
    goodsCoverBig: {
        width: px(710),
        height: px(440),
        overflow: 'hidden',
        borderRadius: px(12)
    },
    imageBox: {
        width: px(710),
        height: px(440),
        position: 'relative',
        zIndex: 0,
        borderRadius: px(12),
        overflow: 'hidden'
    },
    goods_img_cover: {
        position: 'absolute',
        left: px(94),
        top: px(94),
        zIndex: 1,
        width: px(180),
        height: px(180),
        borderRadius: px(90),
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    goods_img_coverBig: {
        position: 'absolute',
        left: px(285),
        top: px(130),
        zIndex: 1,
        width: px(180),
        height: px(180),
        borderRadius: px(90),
        overflow: 'hidden',
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    goods_img_txt: {
        fontSize: px(36),
        color: '#fff'
    },
    labels: {
        position: 'absolute',
        top: px(8),
        left: px(8),
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    labelImg: {
        width: px(60),
        height: px(60),
        marginRight: px(8)
    },
    sessionName: {
        paddingLeft: px(20),
        paddingRight: px(20),
        paddingTop: px(20),
        backgroundColor: '#fff'
    },
    goodsShowNameBox: {
        height: px(32),
        marginBottom: px(10)
    },
    goodsShowName: {
        fontSize: px(28)
    },
    goodsShowDesc_: {
        height: px(85),
        position: 'relative'
    },
    flag_: {
        position: 'absolute',
        zIndex: 1,
        paddingLeft: px(5),
        paddingRight: px(5),
        backgroundColor: '#000',
        height: px(24),
        borderRadius: px(4),
        overflow: 'hidden',
        marginTop: px(3),
        justifyContent: 'center',
        alignItems: 'center'
    },
    flagB: {
        backgroundColor: '#56beec',
    },
    flagZ: {
        backgroundColor: '#6cd972',
    },
    flagTxt: {
        color: '#fff',
        fontSize: px(18)
    },
    goodsShowDesc: {
        fontSize: px(24),
        color: '#858385'
    },
    flag: {
        fontSize: px(18)
    },
    salePrice: {
        fontSize: px(26),
        color: "#d0648f"
    },
    salePrice_: {
        fontSize: px(38)
    },
    sessionPrice: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        backgroundColor: '#fff'
    },
    marketPrice: {
        color: '#858385',
        fontSize: px(24),
        marginLeft: px(20),
        marginBottom: px(5),
        textDecorationLine: 'line-through'
    },
    sessionNoName: {
        paddingLeft: px(20),
        paddingRight: px(20),
        backgroundColor: '#fff'
    },
    sessionNoNameBig: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    operator: {
        width: px(320),
        height: px(52),
        position: 'relative',
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    operatorBg: {
        width: px(320),
        height: px(52),
        position: 'absolute',
        left: 0
    },
    shareBorder: {
        width: px(252),
        height: px(50),
        paddingLeft: px(18),
        paddingRight: px(18),
    },
    share_: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    goodsActionShareBtn: {
        color: '#fff',
        backgroundColor: 'transparent',
        fontSize: px(24),
    },
    goodsShareIcon: {
        width: px(30),
        height: px(32),
        marginRight: px(8)
    },
    cartBorder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    cartC: {
        width: px(60),
        height: px(60),
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    cartCBorder: {
        overflow: 'hidden',
        borderRadius: px(30),
    },
    cart: {
        overflow: 'hidden',
        width: px(39),
        height: px(33)
    },
});

//顶部搜索条组件
class SearchHeader extends React.Component {
    render() {
        return <View style={styleSearchBar.header}>
            <TouchableOpacity activeOpacity={0.9} onPress={() => this.shareTo()}>
                <View style={styleSearchBar.back}>
                    <Image source={{ uri: 'http://img.cdn.daling.com/data/files/mobile/img/dalingjia.jpg' }}
                        style={styleSearchBar.shopLogo} />
                    <Image style={styleSearchBar.headerShareImg}
                        source={{ uri: require("../images/icon-index-share") }} />
                </View>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={() => this.goSearch()}>
                <View style={[styleSearchBar.headerSearchBar, {
                    backgroundColor: '#fff'
                }]}>
                    <Image style={styleSearchBar.headerSearchImg}
                        source={{ uri: require("../images/icon-search-gray") }} />
                    <Text allowFontScaling={false} style={styleSearchBar.headerSearchInput}>在<Text allowFontScaling={false} style={{ color: '#d0648f' }}>安心淘</Text>中搜索</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    }
    //跳转搜索页
    goSearch() {
        this.props.navigation.navigate('SearchPage', {});
    }
    //TODO:分享
    shareTo() { }
}

const styleSearchBar = StyleSheet.create({
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'space-between',
        paddingLeft: px(24),
        paddingRight: px(30),
        paddingTop: Platform.OS === "ios" ? px(40) : px(10),
        height: Platform.OS === "ios" ? px(116) : px(76),
    },
    back: {
        width: px(70),
        height: px(60),
    },
    shopLogo: {
        width: px(56),
        height: px(56),
        borderRadius: px(28),
        overflow: 'hidden',
        borderWidth: px(2),
        borderColor: "#fff"
    },
    headerShareImg: {
        width: px(28),
        height: px(28),
        borderRadius: px(14),
        borderWidth: px(1),
        borderColor: '#efefef',
        overflow: 'hidden',
        position: 'absolute',
        left: px(40),
        top: px(30)
    },
    headerSearchBar: {
        flexDirection: "row",
        alignItems: "center",
        borderRadius: px(35),
        justifyContent: "center",
        height: px(56),
        overflow: 'hidden',
        marginLeft: px(10)
    },
    headerSearchImg: {
        marginLeft: px(16),
        width: px(28),
        height: px(28),
        marginRight: px(8)
    },
    headerSearchInput: {
        width: px(570),
        color: "#b2b3b5",
        fontSize: px(26),
    },
    modalHead: {
        alignItems: 'center',
        flexDirection: 'column',
        height: px(169),
        paddingLeft: px(145),
        paddingRight: px(145),
        paddingTop: px(53)
    },
    modalTxt1: {
        fontSize: px(42),
        color: '#d0648f',
        fontWeight: '900'
    },
    modalTxt2: {
        fontSize: px(26),
        color: '#858385',
        textAlign: 'center',
        marginTop: px(10),
        lineHeight: px(30)
    }
});

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadText: "加载中...",
            list: [],
            refreshing: false, //列表刷新用到的变量
        }
        this.start = 0;
    }

    render() {
        return <View style={{ flex: 1 }}>
            <View style={styles.headerView}>
                <SearchHeader navigation={this.props.navigation} />
            </View>
            <View style={styles.pageView}>
                <FlatList ref="flatlist"
                    refreshing={this.state.refreshing}
                    numColumns={2}//2列
                    onRefresh={() => this.refresh()}//刷新调用的方法
                    onEndReached={() => this.nextPage()}//拉倒底部加载下一页
                    ListHeaderComponent={<View style={{ backgroundColor: "#fff" }}>
                        <MyBanner ref="banner" />
                        <Modules ref="module"
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
                    renderItem={({ item, index }) =>
                        <GoodItem
                            addCart={this.addCart.bind(this)}
                            index={index}
                            goods={item}
                            navigation={this.props.navigation}
                        />
                    }
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
        this.loadShop();
    }
    //刷新方法
    async refresh() {
        this.isEnd = false;
        this.setState({
            refreshing: true
        })
        try {
            await this.refs.banner.refresh()
            await this.refs.module.refresh();
            await this.loadShop();
        } finally {
            this.setState({
                refreshing: false
            });
        }
    }
    //加载商品第一页
    async loadShop() {
        this.start = 0;
        try {
            let list = await request.get(`/goods/list.do?limit=20&start=${this.start}&categoryId=`)
            if (!list.items || list.items.length == 0) {
                this.setState({
                    loadText: "别扯啦，到底了"
                });
                this.isEnd = true;
                return;
            }
            if (list.totalPages < 2) {
                this.setState({
                    loadText: list.items.length > 1 ? "别扯啦，到底了" : ''
                });
                this.isEnd = true;
            }
            this.setState({
                list: list.items,
                total: list.total
            });
        } catch (e) {
            toast(e.message);
            this.isEnd = true;
            this.setState({
                loadText: this.state.items.length > 1 ? "别扯啦，到底了" : ''
            });
        }
        this.loading = false;
    }
    //加载商品其他页
    async nextPage() {
        if (this.loading || this.isEnd) return;
        this.loading = true;
        try {
            if (!this.start) this.start = 0;
            this.start = this.start + 1;
            let res = await request.get(`/goods/list.do?limit=20&start=${this.start}&categoryId=`);//this.start + 1
            this.setState({
                list: this.state.list.concat(res.items),
                total: res.total
            });
            if (!res.items || res.items.length == 0 || res.totalPages <= this.start + 1) {
                this.setState({
                    loadText: "别扯啦，到底了"
                });
                this.isEnd = true;
                return;
            }

        } catch (e) {
            toast(e.message);
            this.isEnd = true;
            this.setState({
                loadText: "别扯啦，到底了"
            });
        } finally {
            this.loading = false;
        }
    }
    //TODO:滚动监听
    _onScroll() {

    }
    //TODO:加入购物车
    addCart() { }
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
    headerView: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        zIndex: 100,
    },
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
