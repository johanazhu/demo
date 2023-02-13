function jQuery(name, age) {
  return new jQuery.prototype.init(name, age);
}

jQuery.prototype = {
  constructor: jQuery,
  init: function (name, age) {
    this.name = name;
    this.age = age;
    this.sayName = function () {
      console.log("My name is", this.name);
    };
  },
  sayHello: function () {
    console.log("hello");
  },
};

jQuery.prototype.init.prototype = jQuery.prototype;

window.$ = jQuery;
