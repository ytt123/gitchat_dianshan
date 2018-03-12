import { AppRegistry } from 'react-native';
import Pages from './src';
import {registerApp} from 'react-native-wechat';

registerApp('wxfa333b610f00ded2')
//启动
AppRegistry.registerComponent('anxintao', () => Pages);
