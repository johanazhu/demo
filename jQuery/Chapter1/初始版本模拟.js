function jQuery(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function () {
    console.log("sayName", this.name);
  };
  return new jQuery.fn.init(name, age);
}

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  sayHello: function () {
    console.log("say Hello");
  },
  init: function (name, age) {
    console.log("初始化", name, age);
  },
};

jQuery.fn.init.prototype = jQuery.fn;

window.$ = jQuery;
