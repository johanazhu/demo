function jQuery(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function () {
    console.log("sayName", this.name);
  };
  return new jQuery.fn.init(name, age);
}

// 静态方法
// jQuery.Animation = function () {};
// jQuery.Event = function () {};
// jQuery.ajax = function () {};
// jQuery.attr = function () {};
// jQuery.clone = function () {};
// jQuery.css = function () {};
// jQuery.data = function () {};
// jQuery.each = function () {};
// jQuery.event = function () {};

jQuery.fn = jQuery.prototype = {
  // 原型属性
  jquery: "0.1",
  length: 0,
  constructor: jQuery,
  // 原型方法
  sayHello: function () {
    console.log("say Hello");
  },
  init: function (name, age) {
    console.log("初始化", name, age);
    return this;
  },
  // add: function () {},
  // animate: function () {},
  // append: function () {},
  // attr: function () {},
  // css: function () {},
  // children: function () {},
  // data: function () {},
  // find: function () {},
  // html: function () {},
  // keydown: function () {},
  // keyup: function () {},
  // mousedown: function () {},
  // mouseenter: function () {},
  // on: function () {},
  // off: function () {},
  // slice: function () {},
};

jQuery.fn.init.prototype = jQuery.fn;

window.$ = jQuery;
