"use strict";
class Base {
    constructor() {
        //变量a,类型string
        this.a = "test_a";
    }
}
class Demo extends Base {
    constructor() {
        super(...arguments);
        this.b = "test_b";
    }
    //方法c,参数类型string,返回string
    c(d) {
        return this.a;
    }
    static e() {
        return "aaa";
    }
}
let demo = new Demo();
console.log(demo.c("t"));
console.log(Demo.e());
//# sourceMappingURL=demo.js.map