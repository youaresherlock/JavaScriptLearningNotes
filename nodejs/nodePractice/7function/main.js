//在js，一个函数可以作为另一个函数的参数.我们可以先定义一个函数，然后传递，也可以在传递参数的地方直接定义函数
function say(world) {
	console.log(world);
}

function execute(someFunction, value) {
	someFunction(value);
}

execute(say, "Hello");

