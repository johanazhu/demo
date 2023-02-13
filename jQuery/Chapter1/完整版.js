function jQuery(name, age) {
  // 实例属性
  this.name = name;
  this.age = age;
  // 实例方法
  this.sayName = function () {
    console.log("My name is", this.name);
  };
}

// 静态方法
jQuery.sayGoodBye = function () {
  console.log("Good Bye");
};

jQuery.prototype = {
  // 指对构造函数
  constructor: jQuery,
  // 原型方法
  sayHello: function () {
    console.log("say Hello");
  },
};

window.$ = jQuery;
