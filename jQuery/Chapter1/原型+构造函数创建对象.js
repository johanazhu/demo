function jQuery(name, age) {
  // 实例属性
  this.name = name;
  this.age = age;
  // 实例方法
  this.sayName = function () {
    console.log("My name is", this.name);
  };
}

window.$ = jQuery;
