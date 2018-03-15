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
    Linking,
    Platform,
    TextInput,
    Switch
} from 'react-native';
import { getHeader } from '../utils/request'
import px from '../utils/px'
import TopHeader from '../component/header'

export default class extends React.Component {

    constructor(props) {
        super(props);
        if (!this.props.navigation.state.params) this.props.navigation.state.params = {}
        this.state = {
            name: "",
            phone: "",
            sheng: "",
            shi: "",
            qu: "",
            detail: "",
            newCardNo: "",
            checked: false
        }
        this.callback = this.props.navigation.state.params.callback
    }
    render() {
        return <View style={{ flex: 1 }}>
            {/*顶部组件*/}
            <TopHeader navigation={this.props.navigation}
                title={this.props.navigation.state.params.id ? '编辑收货地址' : '添加收货地址'} />
            {/*内容部分*/}
            <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.page}>
                <View style={styles.form}>
                    {/*收货人姓名*/}
                    <View style={styles.formGroup}>
                        <View style={styles.formLabel}>
                            <TextInput
                                style={styles.formLabelTxt}
                                editable={false}
                                underlineColorAndroid="transparent"
                                value="收货人" />
                        </View>
                        <TextInput ref="names" style={styles.formInput}
                            value={this.state.name}
                            underlineColorAndroid="transparent"
                            maxLength={20}
                            onChangeText={(v) => this.setState({ name: v })}
                            placeholder="请输入收货人姓名"
                            onFocus={() => this.textInput = this.refs.names}
                            onSubmitEditing={() => this.textInput.blur()}
                        />
                    </View>
                    {/*收货人手机号*/}
                    <View style={styles.formGroup}>
                        <View style={styles.formLabel}>
                            <TextInput
                                style={styles.formLabelTxt}
                                editable={false}
                                underlineColorAndroid="transparent"
                                value="手机号" />
                        </View>
                        <TextInput ref="mobile" style={styles.formInput}
                            value={this.state.phone}
                            keyboardType="phone-pad"
                            maxLength={11}
                            underlineColorAndroid="transparent"
                            onChangeText={(v) => this.setState({ phone: v })}
                            onFocus={() => this.textInput = this.refs.mobile}
                            onSubmitEditing={() => this.textInput.blur()}
                            placeholder="请输入收货人手机号码" />
                    </View>
                    {/*省*/}
                    <View style={styles.formGroup}>
                        <View style={styles.formLabel}>
                            <TextInput
                                style={styles.formLabelTxt}
                                editable={false}
                                underlineColorAndroid="transparent"
                                value="选择省">
                            </TextInput>
                        </View>
                        <TextInput style={styles.formInput}
                            value={this.state.sheng}
                            maxLength={30}
                            underlineColorAndroid="transparent"
                            onChangeText={(v) => this.setState({ sheng: v })}
                            onSubmitEditing={() => this.textInput.blur()}
                            placeholder="请输入您的所在省份" />
                    </View>
                    {/*市*/}
                    <View style={styles.formGroup}>
                        <View style={styles.formLabel}>
                            <TextInput
                                style={styles.formLabelTxt}
                                editable={false}
                                underlineColorAndroid="transparent"
                                value="选择市">
                            </TextInput>
                        </View>
                        <TextInput style={styles.formInput}
                            value={this.state.shi}
                            maxLength={30}
                            underlineColorAndroid="transparent"
                            onChangeText={(v) => this.setState({ shi: v })}
                            onSubmitEditing={() => this.textInput.blur()}
                            placeholder="请输入您的所在地市" />
                    </View>
                    {/*区*/}
                    <View style={styles.formGroup}>
                        <View style={styles.formLabel}>
                            <TextInput
                                style={styles.formLabelTxt}
                                editable={false}
                                underlineColorAndroid="transparent"
                                value="选择区">
                            </TextInput>
                        </View>
                        <TextInput style={styles.formInput}
                            value={this.state.qu}
                            maxLength={30}
                            underlineColorAndroid="transparent"
                            onChangeText={(v) => this.setState({ qu: v })}
                            onSubmitEditing={() => this.textInput.blur()}
                            placeholder="请输入您的所在地区" />
                    </View>
                    {/*具体的地址*/}
                    <View style={styles.formGroup}>
                        <View style={styles.formLabel}>
                            <TextInput
                                editable={false}
                                style={styles.formLabelTxt}
                                underlineColorAndroid="transparent"
                                value="详细地址">
                            </TextInput>
                        </View>
                        <TextInput ref="address" style={styles.formInput}
                            value={this.state.detail}
                            maxLength={256}
                            underlineColorAndroid="transparent"
                            onChangeText={(v) => this.setState({ detail: v })}
                            onFocus={() => this.textInput = this.refs.address}
                            onSubmitEditing={() => this.textInput.blur()}
                            placeholder="请输入详细街道地址" />
                    </View>
                </View>
                {/*身份证*/}
                <View style={styles.form}>
                    <View style={styles.hint}>
                        <Text allowFontScaling={false} style={styles.idHint}>
                            应海关要求请填写身份证信息，我们会保护您的信息安全
                                </Text>
                    </View>
                    <View style={styles.formGroup}>
                        <View style={styles.formLabel}>
                            <TextInput
                                style={styles.formLabelTxt}
                                editable={false}
                                underlineColorAndroid="transparent"
                                value="身份证" />
                        </View>
                        <TextInput ref="ids" style={styles.formInput}
                            onChangeText={(v) => this.setState({ newCardNo: v })}
                            underlineColorAndroid="transparent"
                            maxLength={18}
                            onFocus={() => this.textInput = this.refs.ids}
                            onSubmitEditing={() => this.textInput.blur()}
                            placeholder={this.state.cardNo || '选填'} />
                    </View>
                </View>
                {/*设为默认*/}
                <View style={styles.defaultAddress}>
                    <View style={styles.defaultField}>
                        <Text allowFontScaling={false} style={styles.defaultTitle}>设为默认地址</Text>
                        <Text allowFontScaling={false} style={styles.defaultDesc}>每次下单时会使用默认地址</Text>
                    </View>
                    <View style={styles.switch}>
                        {
                            Platform.OS == 'ios' ? <Switch onTintColor="#32C632"
                                tintColor="#e5e5ea"
                                value={this.state.checked} onValueChange={this.setDefaultAddress} /> :
                                <Switch onTintColor="#32C632"
                                    tintColor="#e5e5ea"
                                    thumbTintColor="#ffffff"
                                    value={this.state.checked} onValueChange={this.setDefaultAddress} />
                        }
                    </View>
                </View>
            </ScrollView>
            {/*保存*/}
            <TouchableWithoutFeedback onPress={() => this.save()}>
                <View style={styles.footer}>
                    <Text allowFontScaling={false} style={styles.footerTxt}>保存</Text>
                </View>
            </TouchableWithoutFeedback>
        </View>
    }

    componentDidMount() {

    }
    //设置默认
    setDefaultAddress(status) {
        this.setState({
            checked: status
        })
    }

    save() {
        if (!this.state.name) {
            toast('请输入收货人姓名'); return;
        }
    }
}
const styles = StyleSheet.create({
    defaultAddress: {
        flexDirection: 'row',
        height: px(120),
        width: px(750),
        // marginBottom: px(30),
        backgroundColor: '#fff'
    },
    defaultField: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: px(30)
    },
    defaultTitle: {
        fontSize: px(28),
        color: '#252426',
        includeFontPadding: false
    },
    defaultDesc: {
        paddingTop: px(10),
        fontSize: px(26),
        color: '#b2b3b5',
        includeFontPadding: false
    },
    switch: {
        width: px(100),
        height: px(120),
        marginRight: px(30),
        justifyContent: 'center'
    },
    page: {
        backgroundColor: '#f5f3f6',
        flex: 1
    },
    form: {
        marginBottom: px(20),
        backgroundColor: '#fff'
    },
    formGroup: {
        flexDirection: 'row',
        width: px(750),
        height: px(80),
        borderBottomWidth: px(1),
        borderBottomColor: '#f5f4f6'
    },
    formLabel: {
        width: px(190),
        height: px(80),
        paddingLeft: px(30),
        justifyContent: 'center'
    },
    formLabelTxt: {
        flex: 1,
        fontSize: px(26),
        color: '#222',
        padding: 0,
        includeFontPadding: false
    },
    formInput: {
        flex: 1,
        fontSize: px(26),
        borderWidth: 0,
        textAlignVertical: 'center',
        padding: 0
    },
    formPicker: {
        flex: 1,
        borderWidth: 0,
        padding: 0
    },
    footer: {
        position: "absolute",
        bottom: 0,
        width: px(690),
        height: px(80),
        marginBottom: px(20),
        marginLeft: px(30),
        borderRadius: px(10),
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#d0648f'
    },
    footerTxt: {
        textAlign: 'center',
        fontSize: px(30),
        color: '#fff',
        includeFontPadding: false
    },
    idHint: {
        fontSize: px(22),
        color: '#e86d78',
        textAlignVertical: 'center',
        includeFontPadding: false
    },
    hint: {
        height: px(50),
        justifyContent: 'center',
        paddingLeft: px(30),
        backgroundColor: '#fcf0f3'
    },
    picker_box: {
        justifyContent: 'flex-end',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: 1,
        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    tab: {
        flexDirection: 'row',
        height: px(90),
        backgroundColor: '#d0648f'
    },
    tab_view1: {
        flex: 1,
        justifyContent: 'center'
    },
    tab_txt1: {
        textAlign: 'left',
        fontSize: px(30),
        color: '#fff',
        paddingLeft: px(30),
    },
    tab_txt2: {

        textAlign: 'right',
        fontSize: px(30),
        color: '#fff',
        paddingRight: px(30),
    },
    picker1: {
        flex: 1,
        flexDirection: 'row'
    },
    picker2: {
        flexDirection: 'row',
        backgroundColor: '#fff'
    },
    txtView: {
        flex: 1,
        width: px(510),
        justifyContent: 'center'
    },
    txt1: {
        fontSize: px(26)
    }
});