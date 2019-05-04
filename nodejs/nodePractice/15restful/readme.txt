Node.js RestfulAPI
什么是Rest?
表述性状态传递(Representational State Transfer)是Roy Fielding博士在2000年在他的博士论文中提出来的一种软件架构风格
表述性状态转移时一组架构约束条件和原则.满足这些约束条件和原则的应用程序或设计就是Restful.需要注意的是,rest是设计风格
而不是标准.rest通常使用json数据格式
HTTP方法
以下为REST基本架构的四个方法:
GET-用于获取数据
PUT-用于更新或添加数据
DELETE-用于删除数据
POST-用于添加数据
Restful web services
web service是一个平台独立的,低耦合的,自包含的,基于可编程的web的应用程序,可使用开放的XML标准来表述,发布,发现,协调和配置这些应用程序,用于
开发分布式的互操作的应用程序
基于Rest架构的Web Services即是Restful
由于轻量级以及通过HTTP直接传输数据的特性,web服务的Restful方法已经成为最常见的替代方法,可以使用各种语言(比如Java程序,perl,
ruby,python,php和js实现客户端
restful web服务通常可以通过自动客户端或代表用户的应用程序访问
基于users.json数据我们创建以下RestfulAPI
listUsers	GET	发送内容为空	显示所有用户列表
addUser 	POST	JSON字符串	添加新用户
deleteUser	DELETE	JSON字符串	删除用户
:id		GET	发送内容为空	显示用户详细信息`
