//Buffer转换为JSON对象
//buf.toJSON()
//字符串化一个Buffer实例时，JSON.stringify()会隐式调用该toJSON()
//返回值JSON对象
const buf = Buffer.from([0x1, 0x2, 0x3, 0x4, 0x5]);
const json = JSON.stringify(buf);

// 输出: {"type":"Buffer","data":[1,2,3,4,5]}
console.log(json);

const copy = JSON.parse(json, (key, value) => {
	return value && value.type === "Buffer" ? Buffer.from(value.data) : value;
});

// 输出: <Buffer 01 02 03 04 05>
console.log(copy);
