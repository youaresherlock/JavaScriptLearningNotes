Node.js 多进程
Node.js是以单线程的模式运行的,但它使用的是事件驱动来处理,这样有助于我们在多核cpu的系统上创建多个子进程,从而提高性能
每个子进程总带有三个流对象: child.stdin,child.stdout和child.stderr.他们可能会共享父进程的stdio流,或者也可以是独立的被导流
的流对象
Node提供了child_process模块来创建子进程,方法有:
	exec-child_process.exec使用子进程执行命令,缓存子进程的输出,并将子进程的输出以回调函数参数的形式返回
	spawn-child_process.spawn使用指定的命令行参数创建新进程
	fork-child_process.fork是spawn()的特殊形式,用于在子进程中运行的模块.与spawn方法不同的是,fork会在父进程和子进程之间
	,建立一个通信管道,用于进程之间的通信
