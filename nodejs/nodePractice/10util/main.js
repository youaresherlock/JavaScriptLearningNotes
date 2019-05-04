var util = require("util");
function Base() {
	this.name = "base";
	this.base = 1991;
 	this.sayHello = function() {
		console.log("Hello " + this.name);
	};
}

Base.prototype.showName = function() {
	console.log(this.name);
};

function Sub() {
	this.name = "sub";
}

util.inherits(Sub, Base);

var objBase = new Base();
objBase.showName();
objBase.sayHello();

var objSub = new Sub();
objSub.showName();

console.log(objBase);
console.log(Base.prototype);
console.log(Base.__proto__)
console.log(objSub);
console.log(Sub.prototype);
