'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
//添加路由组件
const react_navigation_1 = __importDefault(require("react-navigation"));
//创建路由
const Pages = react_navigation_1.default.StackNavigator({}, {
    // initialRouteName:'OrderDetail',
    //这里做了一个页面跳转的动画
    transitionConfig: () => ({
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps;
            const { index } = scene;
            const translateX = position.interpolate({
                inputRange: [index - 1, index, index + 1],
                outputRange: [layout.initWidth, 0, 0]
            });
            const opacity = position.interpolate({
                inputRange: [index - 1, index - 0.99, index, index + 0.99, index + 1],
                outputRange: [0, 1, 1, 0.3, 0]
            });
            return { opacity, transform: [{ translateX }] };
        }
    }),
    navigationOptions: {
        header: null
    }
});
//创建一个自己的容器,方便以后对路由做一些处理
class default_1 extends react_1.default.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return react_1.default.createElement(Pages, { onNavigationStateChange: this.listenChange.bind(this) });
    }
    componentDidMount() {
    }
    //监听路由的跳转
    listenChange(state1, state2, action) {
    }
}
exports.default = default_1;
//# sourceMappingURL=index.js.map