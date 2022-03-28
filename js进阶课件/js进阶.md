## js进阶

### 0.对象

#### 0.1.创建对象的三种方式

对象:特指的某个事物,由属性和方法组成

对象是个工具箱有许多可以供我们使用的工具 如数组对象 有push pop splice unshift shift

等等方法供我们使用 同时工具箱也有自己的属性 如数组有数组长度length等属性

```javascript
# 创建对象三种方式:
1  字面量的方式
2  调用系统的构造函数
3  自定义构造函数方式

1.字面量的方式
var person = {
        name:'刘备',
        age:45,
        fight:function(){
            console.log('刘备派出关羽参加战斗！');
        }
    }

2.调用系统的构造函数
var person = new Object();
    person.name = '刘备';
    person.age = 45;
    person.fight = function(){
        console.log('刘备派出关羽参加战斗！');
    }
    
    
 3.自定义构造函数
  function Person(){
        this.name = '刘备';
        this.age = 45;
        this.fight = function(){
            console.log('刘备派出关羽参加战斗！');
        }
    }
    var person = new Person();
```

#### 0.2工厂模式

工厂模式是一种设计模式 可以用于批量生产对象 

```javascript
function createRobot(id,name,age){
          var obj = new Object();
          obj.id = id;
          obj.name = name;
          obj.age = age;
          obj.firethehole = function(){
             console.log('开火');
          }
          return obj;
      }

      var robot = createRobot(1,'复兴号机器人',100);
      console.log(robot);
```

#### 0.3构造函数和实例对象之间的关系

```javascript
# 创建一个构造函数
function Person(name,age){
        this.name = name;
        this.age = age;
        this.eat = function(){
            console.log('吃饭');
        }
      }
 # 实例化一个对象 我们称为实例对象
 # 实例对象可以使用构造函数中的方法和属性
 # 实例化对象需要使用new关键字和构造函数
 var xiaoming = new Person('小明',18);
 console.dir(xiaoming.name);

# 实例对象是由构造函数创建的
# instanceof可以判断实例对象xiaoming是不是由Person这个构造函数创建的
console.log(xiaoming instanceof Person);
# constructor属性也可以表示出实例的构造函数
console.dir(xiaoming.constructor);

//为什么需要创建实例对象
      //原因:对象是抽象的不能直接使用 实例对象是具体的 可以直接使用
      //比如Array对象 我们要用数组存东西 是不是先要实例化一个具体的数组对象 
      //然后才能使用它存东西
      var ary = new Array();
      //或者字面量形式创建实例 var ary = [];
      //使用数组存东西
      ary.push(1);
      //我们没有直接使用Array.push()保存数据
      //Array.push(123);
```



### 1.原型

#### 1.1prototype原型对象 

原型对象可以用来共享数据

只有函数有prototype属性 普通对象没有prototype属性  prototype指向原型对象 原型对象的属性和方法主要提供给实例对象使用

```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
    this.eat=function(){
        console.log('吃饭了')
    }
}
let xiaoming = new Person('小明',13)
let xiaohong = new Person('小红',12)
# 构造函数每创建一个实例 都会创建一次eat方法 这会造成内存浪费
console.log(xiaoming.eat === xiaohong.eat)//打印出来是false 说明创建了两次eat方法 保存在不同的内存空间

# 使用原型对象可以共享方法 避免内存浪费 上面代码可以改成：
function Person(name,age){
    this.name = name;
    this.age = age;
}
Person.prototype.eat = function(){
        console.log('吃饭了')
    }
let xiaoming = new Person('小明',13)
let xiaohong = new Person('小红',12)
console.log(xiaoming.eat === xiaohong.eat)//打印出来是true 说明eat是共享的同一个方法

```

#### 1.2proto原型对象

```javascript
#所有对象都有一个__proto__属性 指向构造函数的原型对象prototype
function Person(name,age){
    this.name = name;
    this.age = age;
}
let p = new Person('刘备',45)
console.log(p.__proto__ === Person.prototype)//打印true 实例对象的原型和构造函数的原型相同
```

#### 1.3constructor

构造器属性 原型对象拥有的属性 指向构造函数

```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
}
let p = new Person('刘备',45)
console.log(Person.prototype.constructor)//打印出Person
```

#### 1.4原型对象 实例对象 构造函数之间的关系

![img](https://img2018.cnblogs.com/blog/850375/201907/850375-20190708151615691-1017611190.png) 

#### 1.5原型进一步分析

```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
}
let p = new Person('刘备',45)

#判断下面对象原型的真假
console.log(p.__proto__ === Person.prototype);//true
console.log(Person.__proto__ === Function.prototype);//true
console.log(Person.prototype.__proto__ === Object.prototype);//true
console.log(p.__proto__.__proto__ === Object.prototype);//true
console.log(Object.prototype.__proto__ === null)//true
```

#### 1.6自定义原型对象

```javascript
function Person(name,age){
    this.name = name;
    this.age = age;
}
//自定义原型对象 自定义后原型对象的构造器指向Object 我们需要手动修改构造器的指向
Person.prototype={
    constructor:Person,
    height:170,
    weight:120
}
```

#### 1.7原型链

每个对象都有__proto__属性，当我们访问一个对象的属性或方法时，

如果这个对象内部不存在这个属性或方法， 那么他就会去原型对象的__proto__里找这个属性，

这个__proto__又会有自己的__proto__，于是就这样 一直找下去直到Object

```javascript
function Person(){
    
}
let p = new Person();
# 我们看下实例对象p有哪些属性和方法
console.dir(p);
# 只有一个__proto__属性 我们使用不存在的constructor属性正常情况下应该打印undefined
console.log(p.constructor);
# 但是这里却打印出了Person 怎么回事？
# 我们打印p.__proto__看看结构 发现原型constructor属性指向Person
console.dir(p.__proto__);
# 由此可见 使用constructor属性时 p实例先在自身寻找属性 如果没找到的话 就会去__proto__指向的原型对象找


```

#### 1.8原型中的方法可以相互访问

```javascript
    //原型中的方法,是可以相互访问的
    function Animal(name,age) {
      this.name=name;
      this.age=age;
    }
    //原型中添加方法
    Animal.prototype.eat=function () {
      console.log("动物吃东西");
      this.play();
    };
    Animal.prototype.play=function () {
      console.log("玩球");
      this.sleep();
    };
    Animal.prototype.sleep=function () {
      console.log("睡觉了");
    };

    var dog=new Animal("小苏",20);
    dog.eat();

    //原型对象中的方法,可以相互调用
```

#### 1.9把随机数对象暴露给window成为全局对象

```javascript
    //通过自调用函数产生一个随机数对象,在自调用函数外面,调用该随机数对象方法产生随机数
    (function (window) {
      //产生随机数的构造函数
      function Random() {
      }
      //在原型对象中添加方法
      Random.prototype.getRandom = function (min,max) {
        return Math.floor(Math.random()*(max-min)+min);
      };
      //把Random对象暴露给顶级对象window--->外部可以直接使用这个对象
      window.Random=Random;
    })(window);
    //实例化随机数对象,这边能够使用Random函数，原因是Random函数已经被绑定到了window对象上
    var rm=new Random();
    //调用方法产生随机数
    console.log(rm.getRandom(0,5));
```

#### 1.10原型的指向是否可以改变？

```javascript
     //定义人的构造函数
     function Person(name,age){
        this.name = name;
        this.age = age;
        
     }
     //给人的原型对象添加eat方法
     Person.prototype.eat = function(){
         console.log('人的吃');
     }
     //定义学生的构造函数
     function Student(){

     }
     //给学生的原型对象添加study方法
     Student.prototype.study = function(){
         console.log('学生学习');
     }

     //现在修改学生的原型 让他指向Person实例
     Student.prototype = new Person('dbb',18);
     //创建一个Student实例
     let stu = new Student();
     console.log(stu);
     console.log(stu.name,stu.age);
     stu.eat();
     stu.study();
    //原型指向可以改变
    //实例对象的原型__proto__指向的是该对象所在的构造函数的原型对象
    //构造函数的原型对象(prototype)指向如果改变了,实例对象的原型(__proto__)指向也会发生改变
```

#### 1.11原型最终指向了哪里

```javascript
    //定义一个构造函数Person
    function Person() {

    }
    Person.prototype.eat=function () {
    console.log("吃东西");
    };

    var per=new Person();
    //实例对象中有__proto__原型
    //构造函数中有prototype原型
	
    //prototype是对象
    //所以 prototype这个对象中也有__proto__,那么指向了哪里
    //实例对象中的__proto__指向的是构造函数的prototype
    //所以 prototype这个对象中__proto__指向的应该是某个构造函数的原型prototype

    //per的__proto__指向Person.prototype
    console.log(per.__proto__ === Person.prototype);
    //Person.prototype.__proto__指向Object.prototype
    console.log(Person.prototype.__proto__ === Object.prototype);
    //Object.prototype.__proto__指向null
    console.log(Object.prototype.__proto__);
```

#### 1.12原型指向改变如何添加方法

```javascript
	   //如果原型指向改变了,那么就应该在原型改变指向之后添加原型方法
       //人的构造函数
       function Person(age) {
         this.age=age;
       }
       //人的原型中添加方法
       Person.prototype.eat=function () {
         console.log("人正在吃东西");
       };
       //学生构造函数
       function Student(sex) {
         this.sex=sex;
       }
    
       //改变了原型对象的指向
       Student.prototype=new Person(10);
       //学生的原型中添加方法
       Student.prototype.sayHi=function () {
         console.log("您好哦");
       };
       var stu=new Student("男");
       stu.eat();
       stu.sayHi();
    
       console.dir(stu);
```

#### 1.13实例对象属性和原型对象属性重名问题

```javascript
    //定义一个构造函数Person
    function Person(age,sex) {
        this.age=age;
        this.sex=sex;
    }
    Person.prototype.name = '刘备';
    var per=new Person(10,"男");
    per.name = 'dbb';
    //因为JS是一门动态类型的语言,对象没有什么,只要点了,那么这个对象就有了这个属性
    console.log(per);
    
    //实例对象访问这个属性,应该先从实例对象中找,找到了就直接用，
    //找不到就去指向的原型对象中找
    console.log(per.name);

```



### 2.自调用函数

自调用函数 函数声明的时候直接调用 只会执行一次 

作用：开启新的作用域 可以防止变量命名污染 

```javascript
# 定义一个foo函数
function foo(){
    console.log('你好')
}
# 如果我不知道已经有foo函数 再定义一个foo函数
function foo(){
    console.log('加油河南')
}
#运行foo
foo()//第二个foo会把第一个顶替掉 浏览器上打印出 加油河南

# 使用自调用函数则不会出现这个问题
(function(){
    function foo(){
        console.log('加油河南')
    }
    foo()
})()
//页面打印出 '你好'和'加油河南'


    
```

#### 2.1基于自调用函数的沙箱模式

```javascript
//沙箱:js中的一块独立的区域,沙箱外面无法修改沙箱里面的变量和函数,
    //保证了沙箱里面数据的安全性
    //沙箱可以用自调用函数实现
    //第一种写法
    (function(){
      var a = 99;
    }())
    console.log(a);

    var num=10;
   //第二种写法
   (function () {
     var num=20;
     console.log(num);
   })();
```



### 3.继承

#### 3.1原型继承

```javascript
//什么是继承？
    //在人类社会中儿子可以继承父辈的金钱，房产等等资源
    //代码中也是一样，子对象A可以继承使用父对象B的属性，方法
    //继承的作用：
    //1.可复用性:减少重复代码
    //2.可扩展性:子对象可以增加父对象没有的方法和属性
    //下面举例说明

    //人:  姓名, 性别, 年龄 ,吃饭, 睡觉 
    //学生类别: 姓名, 性别, 年龄 ,吃饭, 睡觉,  学习

    //定义人Person构造函数
    function Person(name,sex,age){
      this.name = name;
      this.age = age;
      this.sex = sex;
    }
    Person.prototype.eat = function(){
        console.log('吃饭');
    }
    Person.prototype.sleep = function(){
        console.log('睡觉');
    }

    // //定义学生Student构造函数
     function Student(name,sex,age){
       this.name = name;
       this.age = age;
       this.sex = sex;
     }
     Student.prototype.eat = function(){
         console.log('吃饭');
     }
     Student.prototype.sleep = function(){
         console.log('睡觉');
     }
     Student.prototype.study = function(){
         console.log('学习');
     }

    //学生对象和人对象只有一个study方法不同 其他的属性和方法都相同
    //我们这样定义学生的构造函数是没有问题的 但是有没有更好的办法可以简化代码呢？
    //答案是肯定的 我们可以使用继承来简化重复的代码 我们让学生对象继承于人对象
    //js可以通过使用原型来继承 下面我们重新写下Student的构造函数
    function Student(){

    }
    Student.prototype = new Person('刘备','男',45);
    //Person对象没有study方法 这里我们需要添加一个study方法
    Student.prototype.study = function(){
        console.log('学习');
    }
    let stu = new Student();

    //打印属性和方法看是否存在 如果存在的话说明继承成功
    console.log(stu.name,stu.age,stu.sex);
    stu.eat();
    stu.sleep();
    stu.study();
```

#### 3.2借用构造函数

```javascript
//定义人Person构造函数
    function Person(name,sex,age){
      this.name = name;
      this.age = age;
      this.sex = sex;
    }
    Person.prototype.eat = function(){
        console.log('吃饭');
    }
    Person.prototype.sleep = function(){
        console.log('睡觉');
    }

    //定义学生Student的构造函数
    function Student(){

    }
    Student.prototype = new Person('刘备','男',45);
    let stu = new Student();
    console.log(stu.name,stu.sex,stu.age);

    let stu1 = new Student();
    //只有重新赋值才能改变属性
    stu1.name = '关羽';
    stu1.sex = '男';
    stu1.age = 35;
    console.log(stu1.name,stu1.sex,stu1.age);

    //我们发现使用原型继承存在问题:因为改变原型指向的同时实现继承 直接初始化了属性 继承过来的属性的值都是一样的了
    //只能重新调用对象的属性进行重新赋值,

    //解决方案:继承的时候,不用改变原型的指向,直接调用父级的构造函数的方式来为属性赋值就可以了
    //借用构造函数:把要继承的父级的构造函数拿过来,使用一下就可以了

    //如何借用构造函数:构造函数名字.call(当前对象,属性,属性,属性....);
    //解决了属性继承,并且值不重复的问题
    //缺陷:父类中的方法不能继承
    function Student(name,sex,age){
      Person.call(this,name,sex,age)
    }
    let stu = new Student('张飞','男',33);
    console.log(stu.name,stu.sex,stu.age);
    stu.eat();
    stu.sleep();
```

#### 3.3组合继承

```javascript
//使用原型继承的特点:继承了属性和方法，但继承的属性都是一样的
    function Person(name,age){
     this.name = name;
     this.age = age;
     console.log('Person构造函数调用');
    }
    Person.prototype.eat=function(){
        console.log('吃饭');
    }

    function Student(){

    }
    Student.prototype = new Person('刘备',45);

    let stu1 = new Student();
    let stu2 = new Student();
    console.log(stu1.name,stu1.age);
    console.log(stu2.name,stu2.age);

    //借用构造函数继承的特点:解决了属性值都是一样的问题，但是继承不了方法
    function Teacher(name,age){
        Person.call(this,name,age)
    }
    let tea = new Teacher('dbb',18);
    console.log(tea.name,tea.age);
    console.log(tea.eat);

    //我们使用组合继承:原型继承+借用构造函数继承 就可以继承属性和方法并且属性值不会重复
    function Lawyer(name,age){
        //借用函数继承属性
        Person.call(this,name,age)
    }
    //原型继承方法
    Lawyer.prototype = new Person();
    let law = new Lawyer('dbb',34);
    console.log(law.name,law.age);
    console.log(law.eat);
```

#### 3.4寄生组合继承

```javascript
//组合继承会调用两次父类的构造函数 稍微有点消耗内存 
    //更完美的继承方式是 寄生组合继承:借用构造函数继承+寄生继承
    function Person(name,age){
        this.name = name;
        this.age = age;
        console.log('Person构造函数调用');
    }
    Person.prototype.eat = function(){
        console.log('吃饭');
    }

    function Student(name,age){
      //借用构造函数继承
      Person.call(this,name,age)
    }
    //寄生继承
    //1.利用Object.create()方法创建了一个实例对象 并且让该实例的原型指向Person.prototype
    //也就是说parsite.__proto__ === Person.prototype
    let parasite = Object.create(Person.prototype);
    //2.将Student的原型指向parasite 当Student的实例stu使用eat方法时先从Student对象内部找
    //没找到 再从原型stu.__proto__上找也就是从Student.prototype上找 因为Student.prototype指向
    //parasite 也就是从parasite上找 因为parasite是空对象 找不到 再从parasite.__proto__上找
    //parasite.__proto__指向Person.prototype 所以找到了Person原型上的eat方法
    Student.prototype = parasite;
    //3.将Student原型的构造器指向Student
    Student.prototype.constructor = Student;
    let stu = new Student('刘备',45);
    console.log(stu);
    //我们分析下使用stu.eat()的原型链
  //stu.eat()=>stu.__proto__(Student.prototype===parasite)=>parasite.__proto__=>Person.prototype

    //Object.create()方法内部执行
    // function create(obj){
    //     //定义一个空的函数
    //     var fun = function(){};
    //     //fun的原型指向obj
    //     fun.prototype = obj;
    //     return new fun();

    // }
```

### 4.函数

#### 4.1函数中this指向问题

```javascript
    //this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，
    //实际上this指向那个真正调用它的对象

    //普通函数中的this是谁?----window
    function fun(){
        console.log('普通函数',this);
    };
    fun();
    
    //回调函数中的this是谁?----window
    //因为settimeout是window调用的
    setTimeout(function(){
      console.log('回调函数',this);
    },2000)
    //构造函数中的this是谁?-----实例对象
    //创建实例时 new 关键字把this指向了实例对象
    function Person(){
        console.log('构造函数',this);
    }
    //原型对象方法中的this是谁?---实例对象
    //play方法是p实例调用的所以指向实例对象
    Person.prototype.play = function(){
        console.log('原型对象方法',this);
    }
    let p = new Person();
    p.play();
```

#### 4.2this指向练习

```javascript
    //  this的指向在函数定义的时候是确定不了的，只有函数执行的时候才能确定this到底指向谁，
   //  实际上this指向那个真正调用它的对象
    //1.
    var user = "张飞"
    function a(){
    var user = "关羽";
    console.log(this);
    console.log(this.user); 
    }
    a();

    //2.
    var user = "刘德华"
    var o = {
    user:"周杰伦",
    fn:function(){
        console.log(this);
        console.log(this.user);
    }
    }
    o.fn();

    //3.
    var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a);
          }
        }
    }
    o.b.fn();

    //4.
    var o = {
    a:10,
    b:{
        a:12,
        fn:function(){
            console.log(this.a);
            }
        }
    }
    var j = o.b.fn;
    j();
```

#### 4.3apply和call方法

```javascript
     //apply和call方法的作用
    //1.调用函数的一种方式
    function eat(){
        console.log('吃饭');
    }
    //不传参数就相当于eat()
    eat.apply();
    eat.call();

    //2.改变函数中this指向
    let liubei = {
        name:'刘备',
        age:45,
    }
    function Person(name,age){
        this.name = name;
        this.age = age;
    }
    Person.prototype.loginfo=function(height,weight){
        console.log('我叫'+this.name);
        console.log('今年'+this.age+'岁');
        console.log('身高'+height);
        console.log('体重'+weight+'公斤');
    }

    let guanyu = new Person('关羽',39);
    //guanyu.loginfo();
    guanyu.loginfo.apply(liubei,[170,60]);
    guanyu.loginfo.call(liubei,170,60);
    //apply和call的区别
    //第一个参数都是 this 新的指向对象
    //第二个参数差别就来了:
    //call 的参数是直接放进去的，第二第三第 n 个参数全都用逗号分隔，直接放到后面
    //apply 的参数都必须放在一个数组里面传进去
   </script>
```

#### 4.4分析借用构造函数继承call的使用

```javascript
//定义人Person构造函数
    function Person(name,sex){
      this.name = name;
      this.age = age;
    }

    //定义Student构造函数
    function Student(name,age){
       Person.call(this,name,age)
       //Person.call()做了两个操作
       //1.调用了一次Person构造函数
       //2.改变了Person构造函数中的this指向 使得Person构造函数中
       //的this指向了Person.call(this,name,age)方法中的第一个参数this
       //Person.call(this,name,age)中的this因为在构造函数中所以指向了Student实例xiaoming
       //因此就实现了我们创建Student实例时 实例继承了Person的属性name和age
       
       //上面Person.call(this,name,age)代码功能相当于下面：
      //  xiaoming.name = name;
      //  xiaoming.age = age;
    }

    let xiaoming = new Student('小明',18);
```

#### 4.5bind方法

```javascript
let liubei = {
        name:'刘备',
        age:45,
    }
    function Person(name,age){
        this.name = name;
        this.age = age;
    }
    Person.prototype.loginfo=function(height,weight){
        console.log('我叫'+this.name);
        console.log('今年'+this.age+'岁');
        console.log('身高'+height);
        console.log('体重'+weight+'公斤');
    }
    let guanyu = new Person('关羽',39);
    //bind直接复制了一份原来的方法
    //console.log(guanyu.loginfo.bind());

    //bind方法也可以改变原来方法中的this指向
    //不过它不会执行原来的方法只是进行了一次方法的复制 如果想执行原来的方法要加（）调用
    //bind传参和call一样 都是直接放进去 中间用逗号隔开
    guanyu.loginfo.bind(liubei,170,60)()
```

#### 4.6函数中arguments属性

```javascript
    //函数中有一个arguments属性:实参对象
    //arguments是一个类数组对象
    //arguments有一个length属性表示实参的个数
    function f1(x,y,z) {
      //console.log(arguments);
      //类数组对象和数组对象的异同
      //1.类数组对象和数组一样有length属性，也可以通过索引获取属性的值
      //如 arguments[0]获取的就是第一个实参 arguments[1]获取的就是第二个实参
      console.log(arguments[0]);
      console.log(arguments.length);
      //2.类数组对象不能使用数组的方法 如果需要使用可以用call借用数组的方法
      //例如我们借用数组的join方法
      let str = Array.prototype.join.call(arguments);
      console.log(str);
      
    }
    f1(3,5,6);
```

#### 4.7回调函数

```javascript
//当一个函数A作为参数传递给另一个函数B时 A我们称为回调函数

    // //定义
    // function eat(callback){
    //     console.log('eat');
    //    callback();
    // }
    // //调用
    // eat(function(){
    //     console.log('我是回调函数callback');
    // });

    // //定义
    // function eat(callback){
    //     callback();
    //     console.log('eat');
       
    // }
    // //调用
    // eat(function(){
    //     console.log('我是回调函数callback');
    // });

    // //回调函数的作用:可以控制代码块在函数中的执行位置
    // function timermsg(){
    //     setTimeout(function(){
    //     console.log('一秒钟之后');
    //     },1000)
    // }
    // timermsg();
    // //如果我需要在延时器方法执行完之后打印hello world 怎么操作？
    // //直接在timermsg()后面打印？
    // console.log('hello world');

    // //用回调函数可以实现
    // //声明timermsg时加个callback函数参数 在‘一秒钟之后’下面执行callback函数
    // function timermsg(callback){
    //     setTimeout(function(){
    //     console.log('一秒钟之后');
    //     callback()
    //     },1000)
    // }
    // timermsg(function(){
    //     console.log('hello world');
    // })

    //作业
    function fun1(){
        console.log('a');
        function fun2(){
          console.log('b');
        }
        fun2()
    }
    fun1()
    //给fun1加个函数参数callback 打印出 'c'
    //并且需要控制台的打印顺序为a c b
```

#### 4.8函数作为返回值

```javascript
// function fun(){
    //     console.log('fun方法');
    //     return function eat(){
    //         console.log('eat方法');
    //     }
    // }
    // //获取到eat方法
    // let e = fun();
    // //执行eat方法
    // e();


    function fun(){
        console.log('fun方法');
        return function eat(){
            console.log('eat方法');
            return '我是eat方法的返回值'
        }
    }
    //获取到eat方法
    let e = fun();
    //执行eat方法
    let str = e();
    console.log(str);
```

#### 4.9作用域、作用域链和预解析

```javascript
    //作用域:变量和函数的使用范围 分为全局作用域和函数作用域
    //全局作用域:在函数外面定义的变量 全局都可以使用
    var a = 7;
    function fun(){
     console.log(a);
     function fun1(){
      console.log(a);
     }
     fun1()
    }
    fun();

   //函数作用域:在函数内部定义的变量 只能在函数的花括号里面使用
    function fun(){
     var b = 10;
    }
    fun();
    console.log(b);

   //作用域链
   //使用函数中的变量 会先从该函数中去找
　 //如果在当前函数作用域中没有查到值，就会去上级作用域找
   //直到查到全局作用域，这么一个查找过程形成的链条就叫做作用域链
   function fun1(){
      function fun2(){
        var num = 10;
        console.log(num);
      }
      fun2()
   }
   fun1()
   
   function fun1(){
      var num = 10;
      function fun2(){
        
        console.log(num);
      }
      fun2()
   }
   fun1()

   var num = 10;
   function fun1(){
      function fun2(){
        console.log(num);
      }
      fun2()
   }
   fun1()

   //预解析
   //在浏览器解析代码之前,把变量的声明和函数的声明提前(提升)到该作用域的最上面

   //变量提升
   console.log(a);
   var a = 10;
   //上面代码等价于
   var a;
   console.log(a);
   a = 10;

   //函数提升
   //函数提升只会提升函数声明 不会提升函数表达式
   console.log(foo1); // [Function: foo1]
   foo1(); // foo1
   console.log(foo2); // undefined
   foo2(); // TypeError: foo2 is not a function
   function foo1 () {
      console.log("foo1");
   };
   var foo2 = function () {
      console.log("foo2");
   };
```

#### 4.10递归函数

```javascript
//递归:函数中调用函数自己,此时就是递归,递归一定要有结束的条件
    //
    var i = 0;
    function f1() {
      i++;
      if (i < 5) {
        f1();
      }
      console.log("从前有个山,山里有个庙,庙里有个和尚给小和尚讲故事:");
    }
    f1();
```

#### 4.11闭包

```javascript
 //  闭包的概念:在函数A中,有一个函数B,函数B中使用了函数A中定义的变量,此时形成了闭包
    //  闭包的作用:缓存数据
    //  闭包的优点:缓存数据 缺点:内存不被释放
    
    //实现一个简单的闭包
    //函数f1里面有个函数f2并且f2使用了f1的变量num 这就形成了闭包
    function f1() {
        var num=10;
        function f2() {
        num = num + 1;
        console.log(num);
        }
        f2();
    }
    f1();

    //闭包的作用:缓存数据
    function f1() {
        //两个函数中间定义的变量会被缓存
        var num=10;
        return function f2() {
        num = num + 1;
        console.log(num);
        }
    }
    var f = f1();
    f();
    f();

    //对比一下不用闭包
    function f3() {
        var num=10;
        num = num + 1;
        console.log(num);
    }
    f3();
    f3();
    

    var count=10;
    function add(){
        var count=0;
        return function(){
            count++;
            alert(count);
        }
    }
    var s=add()
    s();
    s();
```

#### 4.12函数点赞案例

```javascript
<style>
        ul {
          list-style-type: none;
        }
    
        li {
          float: left;
          margin-left: 10px;
        }
    
        img {
          width: 200px;
          height: 180px;
        }
    
        input {
          margin-left: 30%;
        }
      </style>
    <ul>
        <li><img src="images/ly.jpg" alt=""><br/><input type="button" value="赞(1)"></li>
        <li><img src="images/lyml.jpg" alt=""><br/><input type="button" value="赞(1)"></li>
        <li><img src="images/fj.jpg" alt=""><br/><input type="button" value="赞(1)"></li>
        <li><img src="images/bd.jpg" alt=""><br/><input type="button" value="赞(1)"></li>
      </ul>
   <script>
     function my$(tagname){
         return document.getElementsByTagName(tagname);
     }
     //闭包缓存数据
     function addpraise(){
       var praiseNum = 1;
       return function add(){
           praiseNum++;
           //修改dom的val值
           this.value = "赞"+'('+praiseNum+')'
       }
     }
     var inputs = my$('input');
     for (let i = 0; i < inputs.length; i++) {
         var dom = inputs[i];
         //dom的绑定事件指向addpraise()即指向add函数
         dom.onclick = addpraise();
         
     }
```

