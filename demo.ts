
class Base {
    //变量a,类型string
    a: string = "test_a";

}

class Demo extends Base {
    b: string = "test_b";
    //方法c,参数类型string,返回string
    c(d: string): string {
        return this.a;
    }
    static e() {
        return "aaa";
    }
}

let demo = new Demo();
console.log(demo.c("t"))
console.log(Demo.e())