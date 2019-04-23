//创建一个长度为10, 且用0填充的Buffer
const buf1 = Buffer.alloc(10);

//创建一个长度为10，且用0x1填充的Buffer
const buf2 = Buffer.alloc(10, 1);

//创建一个长度10，且未初始化的Buffer
//这个比调用Buffer.alloc()更快
//但返回的Buffer实例可能包含旧数据
//因此需要使用fill()或write()重写
const buf3 = Buffer.allocUnsafe(10);

//创建一个包含[0x1, 0x2, 0x3]的Buffer
const buf4 = Buffer.from([1, 2, 3]);

// 创建一个包含 UTF-8 字节 [0x74, 0xc3, 0xa9, 0x73, 0x74] 的 Buffer。
const buf5 = Buffer.from('tést');

// 创建一个包含 Latin-1 字节 [0x74, 0xe9, 0x73, 0x74] 的 Buffer。
const buf6 = Buffer.from('tést', 'latin1');
