//在execute接受第一个参数的地方直接定义了我们准备传递个execute的函数,匿名函数
function execute(someFunction, value) {
	someFunction(value);
}

execute(function(word) {
	console.log(word);
}, "Hello");
