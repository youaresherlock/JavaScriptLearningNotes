> 前言:
> 认证授权是目前大多数系统都必须要实现的功能,认证就是验证用户的身份，授权就是验证身份后对受限资源的访问控制

>前后端常见鉴权方式:
>* HTTP Basic Authentication基本认证
>* 基于cookie认证: 
>   1. cookie认证
>   1. session认证
>* token(令牌)认证
>    1. SAML(淘汰了)
>   2. JWT(JSON Web Token)
>*  开放授权(OAuth)
>
>注:
&emsp;Auth0,是一家"identity-as-a-service'提供商,Autho0将现有主流的授权协议都实现了一遍，还为多种主流语言提供了SDK。其中JWT与SAML(设计于2005年，是较早的格式，基于XML.JWT是基于JSON，并用于新的身份验证和授权协议，如OpenID Connect和OAutho2.0)都是其设计的.
___
#### 1. HTTP Basic Authentication
> 简介：
> 参考文档: [Basic Authentication](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication)
> &emsp;这种授权方式是浏览器遵守http协议实现的基本授权方式，用于限制对网站资源的访问。这种方式不需要Cookie和Session,只需要客户端发起请求的时候，在头部header中提交用户名和密码就可以.如果没有附加，会弹出一个对话框,要求输入用户名和密码。但它不提供信息加密措施，通常都是以明文或者base64编码传输,所以基本验证方案并不安全。基本验证方案应与HTTPS/TLS协议搭配使用。(基本淘汰)

>认证过程(服务端开启了`www-authentication`认证功能):
![图解](https://img-blog.csdnimg.cn/20190411115856336.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMjUyOTU3,size_16,color_FFFFFF,t_70)
>&emsp;1. 客户端向服务端请求数据(http请求或者一个ajax异步请求).此时，假设客户端尚未被验证.
>&emsp;2. 服务端收到请求后，首先解析发送来的数据是否包含有`Authorization: Basic YWRtaW46YWRtaW4=`这种格式的数据，如果没有这样的数据，则服务端会发送HTTP信息头`WWW-Authenticate: Basic realm=“一串字符串”`到客户端.响应客户端的状态码是401 Unauthorized。
>&emsp;3. 当客户端(浏览器)收到带有类似带有类似`WWW-Authenticate: Basic realm=“.”`的信息后，会弹出登录验证的对话框，要求用户输入验证信息.
>&emsp;4. 用户输入用户名和密码后，浏览器用Base64编码，放在Authorization header(`Authorization: Basic YWRtaW46YWRtaW4=`经base64解密后，为admin:admin)中发送给服务端。
>&emsp;5. 服务端收到带有用户验证信息的数据后，会将Authorization header中的用户名密码取出,进行验证，如果验证通过，将根据请求，发送资源给客户端.
>&emsp;6. 认证之后将认证信息放在session,以后在sessin有效期内就不用再认证了.
>&emsp;7. 许多客户端同时支持避免弹出登录框，而是使用包含用户名和密码的经过编码的URL。(形如`https://username:password@www.example.com/`)此方法已经废弃.
___
#### 2. 基于cookie的认证








test.md