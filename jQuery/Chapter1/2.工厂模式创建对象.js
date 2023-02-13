function jQuery(name, age) {
  function init(name, age) {
    // 实例属性
    this.name = name;
    this.age = age;
    // 实例方法
    this.sayName = function () {
      console.log("My name is", this.name);
    };
  }
  // 加上这个方法就不行了
  this.sayHello = function () {
    console.log("hello");
  };
  return new init(name, age);
}

window.$ = jQuery;
