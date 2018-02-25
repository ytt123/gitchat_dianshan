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
    ScrollView
} from 'react-native';
import { log, logWarm, logErr } from '../utils/log'
import request from '../utils/request'
import px from '../utils/px'
import toast from '../utils/toast'
import Header from '../component/header'

export default class extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: "",
            labelList: [],
            goodsShowName: "",
            goodsShowDesc: "",
            salePrice: 0,
            discount: '10',
            marketPrice: 0,
            isInBond: 0,
            isForeignSupply: 0,
            taxation: 0,

        };
        this.id = this.props.navigation.state.params.id;
        this.sku = this.props.navigation.state.params.sku;
    }
    render() {
        return <View>
            <Header navigation={this.props.navigation} title="详情页" />
            <ScrollView>
                <View style={styles.goodsInfo}>
                    {/*顶部图片*/}
                    {this.state.image ? <Image style={styles.coverImage}
                        source={{
                            uri: this.state.image
                        }}
                        resizeMode="cover"
                        resizeMethod="resize" /> : null}
                    {/*图片上的标签*/}
                    <View style={styles.labels}>
                        {this.state.labelList.map((item) =>
                            <Image key={item.labelId} style={[styles.labelImg, { width: px(item.width), height: px(item.height) }]}
                                resizeMode="cover"
                                resizeMethod="resize"
                                source={{
                                    uri: item.labelLogo
                                }} />)}
                    </View>
                    {/*商品的标题*/}
                    <View style={styles.goodsWrap}>
                        <Text allowFontScaling={false} style={styles.goodsWrapTxt}>
                            {this.state.goodsShowName} {this.state.goodsShowDesc}
                        </Text>
                    </View>
                    {/*商品价格*/}
                    <View style={styles.goodsPrices}>
                        <View style={[styles.priceInfo]}>
                            <Text allowFontScaling={false} style={styles.price1}>
                                ￥<Text allowFontScaling={false} style={{ fontSize: px(50) }}>{Number(this.state.salePrice).toFixed(2)}</Text>
                            </Text>
                            <View style={styles.price2}>
                                <Text allowFontScaling={false} style={{ fontSize: px(22), includeFontPadding: false, color: '#eb83b2' }}>
                                    {this.state.discount}折
                                        </Text>
                            </View>
                            <Text allowFontScaling={false} style={{ fontSize: px(22), color: '#7a787a', textDecorationLine: 'line-through' }}>
                                ￥{Number(this.state.marketPrice).toFixed(2)}
                            </Text>
                        </View>
                        {
                            (this.state.isInBond == 1 || this.state.isForeignSupply == 2) &&
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text allowFontScaling={false} style={{ fontSize: px(22), color: '#7a787a', marginLeft: px(12) }}>
                                        税费￥{Number(this.state.taxation).toFixed(2)}
                                    </Text>
                                </View>
                                <Text allowFontScaling={false}
                                    style={styles.gou}>海购政策</Text>
                            </View>
                        }
                    </View>
                    <View style={styles.promotes}>
                        <View style={styles.promotesBox}>
                            <Image
                                style={styles.promoteIcon}
                                source={{ uri: require('../images/icon-promoteRed') }}>
                            </Image>
                            <Text allowFontScaling={false} style={styles.promoteTxt}>一件包邮</Text>
                        </View>
                        <View style={styles.promotesBox}>
                            <Image
                                style={styles.promoteIcon}
                                source={{ uri: require('../images/icon-promoteRed') }}>
                            </Image>
                            <Text allowFontScaling={false} style={styles.promoteTxt}>正品保证</Text>
                        </View>
                        <View style={styles.promotesBox}>
                            <Image
                                style={styles.promoteIcon}
                                source={{ uri: require('../images/icon-promoteRed') }}>
                            </Image>
                            <Text allowFontScaling={false} style={styles.promoteTxt}>极速发货</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    }
    componentDidMount() {
        this.getDetail()
    }

    async getDetail() {
        let goods = {};
        try {
            if (this.sku) {
                goods = await request.get(`/goods/detail.do`, { sku: this.sku });
            } else {
                goods = await request.get(`/goods/detail.do`, { id: this.id });
            }
            //将接口返回的数据并入state中
            this.setState({
                image: goods.image,
                labelList: goods.labelList,
                goodsShowName: goods.goodsShowName,
                goodsShowDesc: goods.goodsShowDesc,
                salePrice: goods.salePrice,
                discount: goods.discount,
                marketPrice: goods.marketPrice,
                isInBond: goods.isInBond,
                taxation: goods.taxation,

            })
        } catch (e) {
            toast(e.message || "内容不存在");
            this.props.navigation.goBack();
        }
    }
}

const styles = StyleSheet.create({
    goodsInfo: {
        backgroundColor: '#fff',
        marginBottom: px(20)
    },
    coverImage: {
        width: px(750),
        height: px(600)
    },
    labels: {
        position: 'absolute',
        top: px(5),
        left: px(10),
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    labelImg: {
        width: px(80),
        height: px(80),
        marginRight: px(8)
    },
    goodsWrap: {
        flexDirection: "row",
        padding: px(30),
        paddingBottom: 0
    },
    goodsWrapTxt: {
        flex: 1,
        fontSize: px(30),
        lineHeight: px(40),
        color: '#222',
        fontWeight: 'normal'
    },
    goodsPrices: {
        marginBottom: px(30),
        width: px(720),
        paddingLeft: px(30)
    },
    priceInfo: {
        height: px(39),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginTop: px(30),
        marginBottom: px(30)
    },
    price1: {
        color: '#252426',
        fontSize: px(26),
        includeFontPadding: false,
        marginRight: px(15),
        marginTop: px(4)
    },
    price2: {
        paddingTop: px(6),
        paddingRight: px(10),
        paddingBottom: px(4),
        paddingLeft: px(10),
        backgroundColor: '#f5f3f6',
        borderRadius: px(6),
        marginRight: px(15)
    },
    gou: {
        color: '#d0648f',
        fontSize: px(24),
    },
    promotes: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#fbfafc',
        height: px(60),
        paddingLeft: px(30),
        paddingRight: px(30)
    },
    promotesBox: {
        flexDirection: 'row'
    },
    promoteIcon: {
        width: px(24),
        height: px(24)
    },
    promoteTxt: {
        marginLeft: px(8),
        marginRight: px(10),
        fontSize: px(22),
        color: '#7a787a'
    },
})