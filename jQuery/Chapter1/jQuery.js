function jQuery(name, age) {
  this.name = name;
  this.age = age;
  this.sayName = function () {
    console.log("sayName", this.name);
  };
}

jQuery.prototype = {
  constructor: jQuery,
  sayHello: function () {
    console.log("say Hello");
  },
};

window.$ = jQuery;
