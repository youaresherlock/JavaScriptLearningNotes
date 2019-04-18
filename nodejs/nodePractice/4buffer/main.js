//Buffer实例一般用于表示编码字符的序列，比如UTF-8，Base64或十六进制编码的数据。通过使用显示的字符编码，
//就可以Buffer实例与普通字符串之间进行相互转换
const buf = Buffer.from("runoob", "ascii");

console.log(buf.toString("hex"));

console.log(buf.toString("base64"));
