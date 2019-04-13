**前言:**
> &emsp;认证授权是目前大多数系统都必须要实现的功能,认证就是验证用户的身份，授权就是验证身份后对受限资源的访问控制
> &emsp;在前后端分离的应用中，后端主要作为Model层，为前端提供数据访问API。为了保证数据可靠地在用户和服务端之间传输，实现服务端的认证就显得很重要。
> &emsp;常见的服务端认证方法有基于Cookie的认证,如session；以及Token(令牌)认证，如JWT.前者依赖于cookie而实现，在每次请求时都需要带上cookie,取出相应字段并与服务器端的进行对比，以实现身份的认证.而后者仅仅需要在HTTP的头部附上token，由服务端check signature即可实现，无须担心cookie存在的cors问题.
> &emsp;实战部分大家可以自行查找各种语言如何实现这些功能，其他博客都有，我这里只是汇总总结一下理论内功.

>前后端常见鉴权方式:
>* `HTTP Basic Authentication`基本认证
>* 基于`cookie`认证: 
>   1. `cookie`认证
>   1. `session`认证
>* `token`(令牌)认证
>    1. `SAML`(淘汰了)
>   2. `JWT(JSON Web Token)`
>*  开放授权(`OAuth`)
>
>注:
&emsp;Auth0,是一家`identity-as-a-service`提供商,Autho0将现有主流的授权协议都实现了一遍，还为多种主流语言提供了SDK。其中JWT与SAML(设计于2005年，是较早的格式，基于XML.JWT是基于JSON，并用于新的身份验证和授权协议，如OpenID Connect和OAutho2.0)都是其设计的.
___
#### 1. `HTTP Basic Authentication`
**(1) 简介：**
> 参考文档: [Basic Authentication](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Authentication)
> &emsp;这种授权方式是浏览器遵守http协议实现的基本授权方式，用于限制对网站资源的访问。这种方式不需要`Cookie`和`Session`,只需要客户端发起请求的时候，在头部header中提交用户名和密码就可以.如果没有附加，会弹出一个对话框,要求输入用户名和密码。但它不提供信息加密措施，通常都是以明文或者`base64`编码传输,所以基本验证方案并不安全。基本验证方案应与`HTTPS/TLS`协议搭配使用。(基本淘汰)
> 
**(2) 认证过程:**
>认证过程(服务端开启了`www-authentication`认证功能):
![图解](https://img-blog.csdnimg.cn/20190411115856336.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMjUyOTU3,size_16,color_FFFFFF,t_70)
>&emsp;1. 客户端向服务端请求数据(http请求或者一个ajax异步请求).此时，假设客户端尚未被验证.
>&emsp;2. 服务端收到请求后，首先解析发送来的数据是否包含有`Authorization: Basic YWRtaW46YWRtaW4=`这种格式的数据，如果没有这样的数据，则服务端会发送HTTP信息头`WWW-Authenticate: Basic realm=“一串字符串”`到客户端.响应客户端的状态码是401 Unauthorized。
>&emsp;3. 当客户端(浏览器)收到带有类似带有类似`WWW-Authenticate: Basic realm=“.”`的信息后，会弹出登录验证的对话框，要求用户输入验证信息.
>&emsp;4. 用户输入用户名和密码后，浏览器用Base64编码，放在`Authorization header`(`Authorization: Basic YWRtaW46YWRtaW4=`经base64解密后，为admin:admin)中发送给服务端。
>&emsp;5. 服务端收到带有用户验证信息的数据后，会将Authorization header中的用户名密码取出,进行验证，如果验证通过，将根据请求，发送资源给客户端.
>&emsp;6. 认证之后将认证信息放在session,以后在sessin有效期内就不用再认证了.
>&emsp;7. 许多客户端同时支持避免弹出登录框，而是使用包含用户名和密码的经过编码的URL。(形如`https://username:password@www.example.com/`)此方法已经废弃.
___
#### 2. 基于`cookie`的认证
**(1) HTTP是一种无状态协议:**
>&emsp; HTTP的每个请求都是完全独立的，每个请求包含了处理这个请求所需的完整的数据，发送请求不涉及到状态变更。
>&emsp;用户第一次发起请求,与服务器建立连接并登陆成功后，为了避免每次打开一个页面都需要登陆一下(注意独立含义)，就出现了cookie,session.cookie和session的作用是创建和维护多组独立的状态.

**HTTP无状态协议的优点:**
>&emsp;HTTP这样的无状态协议，使用元数据(如cookie头)来维护会话，使得会话与连接本身独立起来，这样即便连接断开了，会话状态也不会受到严重伤害，保持会话也不需要保持连接本身。另外，无状态的优点还在于对中间件友好，中间件无需完全理解通信双方的交互过程，只需要能正确分片消息即可，而且中间件可以很方便地将消息在不同的连接上传输而不影响正确性，这就方便了负载均衡等组件的设计。

**HTTP无状态协议的缺点:**
>&emsp;单个请求需要的所有信息都必须要包含在请求中(请求头大，浪费带宽)一次发送到服务端，这导致单个消息的结构需要比较复杂，必须能够支持大量元数据,因此HTTP消息的解析要比其他许多协议要复杂得多。
>&emsp; 相同的数据可能在多个请求上反复传输，降低了协议的效率

**(2) cookie认证:**
**会话跟踪:**
>&emsp; 会话(session)跟踪是web程序中常用的技术，用来跟踪用户的整个会话，常用的会话跟踪技术是Cookie和Session。Cookie通过在客户端记录信息确定用户身份，Session通过在服务端记录信息确定用户身份。

**什么是Cookie:**
> 参考文档: [mdn cookie](https://developer.mozilla.org/en-US/docs/Web/API/Document/cookie)
>&emsp;`cookie`意味"甜饼"，是由W3C组织提出，最早由`Netscape`社区发展的一种机制。目前Cookie已经成为标准,所有浏览器(IE/Firefox/Opera等)都支持Cookie.
>&emsp;`cookie`是一小段的文本信息(`key=value pairs`)，客户端请求服务器，如果服务器需要记录该用户的状态，就使用response向客户端浏览器颁发一个Cookie(响应头中有多个set-cookie字段，每段对应一个cookie).客户端浏览器会把cookie保存起来。当浏览器再请求该网站时，浏览器把请求的网址连同该Cookie一同提交给服务器。服务器检查该Cookie,以此来辨认用户状态。服务器还可以根据需要修改Cookie的内容

**如何查看某个网站颁发的Cookie:**
![在这里插入图片描述](https://img-blog.csdnimg.cn/20190411202629135.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMjUyOTU3,size_16,color_FFFFFF,t_70)
>&emsp; 在浏览器地址栏输`javascript:alert(document.cookie)`,或者在浏览器开发者选项`console`中输入`document.cookie`就可以看到客户端对应该站点保存的cookie.也可以在开发者工具中的Application菜单中选择Storage下的Cookies(可以看到有多种存储，持久化存储或会话级别存储)查看所有该域下的cookie.
>&emsp;在`开发者工具-Application->Storage->Cookies`可以看到很多name/value键值对存储形式,每个cookie还有Domain、Path、Expires、Size、HTTP、Secure等属性。
>&emsp;`domain`和`path`构成了URL,限制cookie能被哪些URL访问。即请求的URL是Domain或其子域、且URL的路径是Path或子路径，则都可以访问该cookie.`Expires`说明了cookie的Max Age(cookie的失效日期).`Size`表示cookie的大小.`Sercure`是设置cookie只在确保安全的请求中才会发送。当请求是HTTPS或者其他安全协议时，包含Secure选项的cookie才能被发送至服务器(默认下为空).`httponly`为真，在控制台通过document.cookie是获取不到的，也不能进行修改。假如合法用户的网页收到了xss攻击，有一段恶意的script脚本插到了网页中，这个script脚本，通过document.cookie读取了用户身份验证相关的cookie,那么只要原样转发cookie,就可以达到目的了.(你可以清除所有cookie销毁其作用)

**cookie的不可跨域名性:**
>&emsp;`cookie`具有不可跨域名性。根据cookie规范，浏览器访问Google只会携带Google的cookie,而不会携带Baidu的Cookie.同样Google也只能操作Google的Cookie,而不能操作Baidu的Cookie，从而保证用户的隐私安全

**跨域cors中如何传递cookie(前端无法向后端你传递cookie):**
>没有跨域:
>&emsp;后端server只要在回应头部‘set-cookie’，那么就会有cookie产生并保存在客户端client。
> &emsp;等到client再次向后端server发送请求时浏览器的机制就会自动携带cookie随着请求一并发送给后端.
> <br>
>  跨域:
>  &emsp;浏览器默认情况下无法主动跨域向后端发送cookie,ajax跨源请求不提供凭据(cookie,HTTP认证及客户端SSL证明等).通过将设置ajax的withCredentials属性设置为true,可以指定某个请求应该发送凭据.如果服务端接受带凭据的请求，会用`Access-Control-Allow-Credentials: true`HTTP头部来相应.如果没有设置，则浏览器不会把响应交给js.

等到client再次向后端server发送请求时浏览器的机制就会自动携带cookie随着请求一并发送给后端。

**cookie的缺点:**
>&emsp;1. 每个特定域名下的cookie数量有限,
>&emsp;2. 存储容量大小只有4KB,所以建议配合`LocalStorage/SessionStorage`,不要滥用cookie.
>&emsp;每次HTTP请求都会发送到服务端，影响获取资源的效率.(Request Headers中的Cookie字段传送客户端cookie(`Cookie: key1=value1;key2=value2`形式))
>&emsp;一些web框架Django,flask等封装获取、设置、删除cookie的方法.
___
**(3) session认证:**
**什么是session:**
>&emsp;Session是另一种记录客户状态的机制，它是在服务端保存的一个数据结构(主要存储的SessionID和Session内容，同时也包含了很多自定义的内容如:用户基础信息、权限信息、用户机构信息、固定变量等)，这个数据可以保存在集群、数据库、文件中，用于跟踪用户的状态。

**传统的session认证:**
>&emsp;用户第一次登陆后,浏览器会将用户信息发送给服务器，服务器会为该用户创建一个`SessionId`,并在响应字段`Set-Cookie`中将该SessionId一并返回给浏览器，浏览器将这些数据保存在本地.当用户再次发送请求时，浏览器会自动的把上次请求存储的cookie数据自动的携带给服务器。服务器接收到请求信息后，会通过浏览器请求的数据中的SessionId判断当前是哪个用户，然后根据SessionId在Session库中获取用户的Session数据返回给浏览器。(可以保持登录状态等)

**认证过程:**
![session-cookie](https://img-blog.csdnimg.cn/20190411224016305.gif)
>&emsp;1. 服务器在接受客户端首次访问时在服务端创建session,然后保存session(我们可以将sessio保存在内存中,也可以保存在redis中，推荐使用后者),然后给这个session生成一个唯一的标识字符串，然后在响应报文`Set-Cookie`字段设置这个唯一的标识字符串.
>&emsp;2. 在服务端签名.这一步只是对sid进行加密处理，服务端会根据这个secret密钥进行解密(非必须步骤)
>&emsp;3. 浏览器收到请求响应的时候会解析响应头，然后将sid保存在本地cookie中.浏览器在下次http请求的请求头中会带上该域名下的cookie信息
>&emsp;4. 服务器在接受客户端请求时会去解析请求头cookie中的sid,然后根据这个sid去找服务端保存的该客户端的session,然后判断该请求是否合法.

**session-cookie认证的问题:**
**Session**: 每个用户经过应用认证之后，都要在服务端做一次记录，以方便用户下次请求的鉴别,通常而言session都是保存在内存中，而随着认证用户的增多，服务端的开销会明显增大.
**扩展性:** 用户认证之后，服务端做认证记录，如果认证的记录被保存在内存中的话，这意味着用户下次请求还必须要请求在这台服务器上，这样才能拿到授权的资源，这样在分布式的应用上，相应的限制了负载均衡器的能力。这也意味着限制了应用的扩展能力。
**CSRF:**因为是基于cookie来进行用户识别的，cookie如果被截获，用户就会很容易受到跨站点请求伪造的攻击
___
#### 3. `token`(令牌)认证
**(1) 简介：**
>&emsp;HTTP请求都是以无状态的形式对接，所以引入了Session,即服务端和客户端都保存一段文本，客户端每次发起请求都带上cookie,取出相应字段并与服务器端进行对比，以实现身份的认证。这样，导致客户端频繁向服务器发出请求数据，服务端开销大.这种情况下，Token应用而生.
>&emsp;当前后端分离后，服务端的API设计一般是无状态的，因此不能使用Cookie+Session保持用户的登录状态.基于token认证机制的应用不需要去考虑用户在那一台服务器登录，这就为应用的扩展提供了遍历.

**(2) Token认证过程:**
>1. 客户端使用用户名跟密码请求登录
>2. 服务端收到请求，去验证用户名与密码
>3. 验证成功后，服务端会签发一个Token(长的十六进制字符串),再把这个Token发送给客户端
>4. 客户端收到Token以后可以把它存储起来，比如放在Cookie里或者Local Storage或内存等介质中.
>5. 客户端每次向服务端请求资源的时候附送(HTTP头部)这个token值
>6. 服务端收到请求，然后去验证客户端请求里面带着的Token,如果验证成功，就向客户端返回请求的数据

**(2) Token的优点:**
>1.  session认证中,sessionid是一个唯一表示的字符串，服务端是根据这个字符串，来查询在服务端保持的session.这里面才保存着用户的登录状态.但是token本身就是一种登录成功凭证，它是在登录成功后根据某种规则生成的一种信息凭证，它里面本身保存着用户的登录状态，服务端只需要根据定义的规则检验这个token是否合法就行.
>2. session-cookie认证是需要cookie配合的，那么在http代理客户端的选择上只有浏览器.因为只有浏览器才会去解析请求响应头里面的cookie,然后每次请求再默认带上该域名下的cookie.但是我们知道http代理客户端不只有浏览器，还有原生APP等等.token就不一样，它是在登录请求成功后再请求响应体中返回的信息，客户端在收到响应的时候，可以把它存在本地cookie,storage,或者内存中,然后在下一次的请求头部带上这个token就行了.
>3. 时效性.token是可以在一段时间内动态改变的.
>4. 可以扩展性.token验证本身是比较灵活的,一是token的解决方案有许多，常用的是JWT,二来我们可以基于token验证机制，专门做一个鉴权服务，用它向多个服务的请求进行统一鉴权.


**注：**
&emsp;CORS(`Cross-Origin Resource Sharing`)是HTML5规范定义的如何跨域访问资源.Origin表示浏览器当前页面的域,当javascript向外域发起请求后，浏览器收到响应后，首先检查`Access-Control-Allow-Origin`是否包含本域，如果是，则此次跨域请求成功，如果不是，则请求失败,JavaScript将无法获取到响应的任何数据.
如: 在csdn.net域下访问github网站，响应头中包含`Access-Control-Allow-Origin: *`
![Response headers](https://img-blog.csdnimg.cn/20190412213500126.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMjUyOTU3,size_16,color_FFFFFF,t_70)
&emsp;这个token必须要在每次请求时传递给服务端，它应该保存在请求头里，另外服务端要支持CORS(跨域资源共享)策略,一般我们在服务端设置`Access-Control-Allow-Origin: *`
___
**(3) SAML和JWT:**

**简介:** 
>官网文档: 
>[SAML:](https://samltool.io/)
>&emsp;Security Assertion Markup Language (SAML) is an XML-based open standard data format for exchanging authentication and authorization data between parties, in particular, between an identity provider and a service provider(xml太复杂了，淘汰了，自己看)
> [JWT:](https://jwt.io/introduction/)
> JSON Web Token (JWT) is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. 

**什么是无状态?:**
>&emsp;微服务集群中的每个服务(微服务架构),对外提供都是Restful分割的接口.而Rest风格的一个最重要的规范就是:服务的无状态性.

**无状态的好处:**
>&emsp;客户端不依赖服务端的信息，任何多次请求不需要访问到同一台服务
>&emsp;服务端的集群和状态对客户端透明
>&emsp;客户端可以任意的迁移和伸缩
>&emsp;减小服务端存储压力

**JWT:** 
>&emsp;JWT(`Json Web Token`)是Auth0提出的通过对JSON进行加密签名来实现授权验证的方案，就是登录成功后将相关信息组成json对象,然后对这个对象进行某种方式的加密,返回给客户端，客户端在下次请求时带上这个token,服务端再收到请求时校验token合法性.JWT可实现无状态、分布式的Web应用授权

**JWT的优点:**
 >1. 体积小(一串十六进制字符串),因而传输速度快
 >2. 传输方式多样. 可以通过HTTP头部(推荐)/URL/POST参数等方式传输
 >3. 严谨的结构化.它自身(payload荷载)中就包含了所有与用户相关的验证信息，如用户可访问路由、访问有效期等信息，服务器无需再去连接数据库验证信息的有效性，并且payload支持应用定制
 >4. 支持跨域验证，多应于单点登录.
 >&emsp;单点登录*Single Sign On): 在多个应用系统中，用户只需登录一次，就可以访问所有相互信任的应用.

**为什么选择JWT:**
&emsp;相比传统的服务端验证，JWT还有以下吸引点.
>1, 充分依赖无状态API，契合Restful设计原则(无状态的HTTP)
>&emsp;无状态是Restful架构设计的一个非常重要的原则。无状态API的每一个请求都是独立的，它要求客户端保存所有需要的认证信息，每次发送请求都要带上自己的状态，以url的形式提交包含cookies等状态的数据.
>2. 易于实现CDN，将静态资源分布式管理
>&emsp; JWT依赖的是在客端本地保存验证信息，不需要利用服务器保存的信息来验证，所以任意一台服务器都可以应答，服务器的资源也能被较好地利用.
>3. 验证解耦，随处生成
>&emsp; 无需使用特定的身份验证方案，只要拥有生成token所需的验证信息，在任何地方都可以调用相应接口生成token，无需繁琐的耦合的验证操作.
>4. 比cookie更支持原生移动端应用
>&emsp；原生的移动应用对cookie于session的支持不够好，而对token的方式支持较好(Node.js有express-jwt、koa-jwt等可供选用)
___

**JWT认证构成:**
图例:[document](https://jwt.io/introduction/)
![JWT](https://img-blog.csdnimg.cn/20190413110059642.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMjUyOTU3,size_16,color_FFFFFF,t_70)
支持的库(我喜欢用Node.js或Python):
![Python](https://img-blog.csdnimg.cn/20190413110203416.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMjUyOTU3,size_16,color_FFFFFF,t_70)
![Node.js](https://img-blog.csdnimg.cn/20190413110247265.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMjUyOTU3,size_16,color_FFFFFF,t_70)
**JWT的构成:**
JWT是由三段信息构成的，将这三段信息文本用`.`链接在一起就构成了JWT字符串
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```
可以看到是由Header(头部)、Payload(荷载)、Sigature(签证)三部分以.分隔构成
```
In its compact form, JSON Web Tokens consist of three parts separated by dots (.), which are:

Header
Payload
Signature
```
<br>

**Header:**
>&emsp;The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used, such as HMAC SHA256 or RSA.
>&emsp;头部由两部分组成，token类型是JWT,运用的签名算法是 HMAC SHA256
```
{
  "alg": "HS256",
  "typ": "JWT"
}
```
然后将头部base64加密(该加密是可以对称解密的),构成了第一部分.
`eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9` (注意这里的JSON没有换行符，如下图解码之后没空格换行符.)
可以使用在线工具验证: [base64解码编码](https://1024tools.com/base64)
![base64](https://img-blog.csdnimg.cn/2019041311115211.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMjUyOTU3,size_16,color_FFFFFF,t_70)
![base64原理](https://img-blog.csdnimg.cn/20190413111351322.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMjUyOTU3,size_16,color_FFFFFF,t_70)
注: 可以看到Header大小是很小的.
<br>
**Payload:**
>&emsp;The second part of the token is the payload, which contains the claims. Claims are statements about an entity (typically, the user) and additional data. There are three types of claims: registered, public, and private claims.
>&emsp;payload包含三部分,标准中注册的声明、公共的声明、私有的声明

<br>

**标准中注册的声明 (建议但不强制使用) ：**
```
iss: jwt签发者
sub: jwt所面向的用户
aud: 接收jwt的一方
exp: jwt的过期时间，这个过期时间必须要大于签发时间
nbf: 定义在什么时间之前，该jwt都是不可用的.
iat: jwt的签发时间
jti: jwt的唯一身份标识，主要用来作为一次性token,从而回避重放攻击。
```

<br>

**公共的声明 ：**
>&emsp;公共的声明可以添加任何的信息，一般添加用户的相关信息或其他业务需要的必要信息.但不建议添加敏感信息，因为该部分在客户端可解密.

<br>

**私有的声明 ：**
>&emsp;私有声明是提供者和消费者所共同定义的声明，一般不建议存放敏感信息，因为base64是对称解密的，意味着该部分信息可以归类为明文信息。

```
{
  "sub": "1234567890",
  "name": "John Doe",
  "admin": true
}
```
然后将其进行base64加密，得到Jwt的第二部分。
```eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9```
![payload](https://img-blog.csdnimg.cn/20190413112921577.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMjUyOTU3,size_16,color_FFFFFF,t_70)
<br>

**Signature:**
>&emsp;To create the signature part you have to take the encoded header, the encoded payload, a secret, the algorithm specified in the header, and sign that
>&emsp;第三部分是一个签证信息，由header(Base64加密)、payload(Base64加密)、secret组成的.

&emsp;这个部分需要base64加密后的header和base64加密后的payload使用.连接组成的字符串，然后通过header中声明的加密方式进行加盐secret组合加密，然后就构成了jwt的第三部分。
```javascript {line-numbers}
// javascript
var encodedString = base64UrlEncode(header) + '.' + base64UrlEncode(payload);

var signature = HMACSHA256(encodedString, 'secret'); // TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```
将这三部分用.连接成一个完整的字符串,构成了最终的jwt:
```eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ```

注：
>&emsp;secret是保存在服务器端的，jwt的签发生成也是在服务器端的，secret就是用来进行jwt的签发和jwt的验证，所以，它就是你服务端的私钥，在任何场景都不应该流露出去。一旦客户端得知这个secret, 那就意味着客户端是可以自我签发jwt了
&emsp;不应该在jwt的payload部分存放敏感信息，因为该部分是客户端可解密的部分。

___
**如何应用**
```
In authentication, when the user successfully logs in using their credentials, 
a JSON Web Token will be returned. Since tokens are credentials, great
care must be taken to prevent security issues. In general, you should not 
keep tokens longer than required.

Whenever the user wants to access a protected route or resource, the user
agent should send the JWT, typically in the Authorization header using the
Bearer schema. The content of the header should look like the following:

Authorization: Bearer <token>
```
一般是在请求头里加入Authorization，并加上Bearer标注：
```js 
fetch('api/user/1', {
  headers: {
    'Authorization': 'Bearer ' + token
  }
})
```
服务端会验证token，如果验证通过就会返回相应的资源。

<br> 

**服务端验证:**
服务端接受到token之后，会逆向构造过程,decode出JWT的三个部分.可以得到sign算法以及payload(都是base64加密，相当于明文),结合服务端配置的scecretKey,可以签名与发来的签名对比检查token是否有效，完成用户身份的认证


**整个流程就是这样的:**
![picture](https://img-blog.csdnimg.cn/20190413113812762.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMjUyOTU3,size_16,color_FFFFFF,t_70)
___
**(4） OAuth2.0:**
>&emsp;OAuth2不是一个标准协议，而是一个安全的授权框架。它详细描述了系统中不同角色、用户、服务前端应用（比如API），以及客户端（比如网站或移动App）之间怎么实现相互认证。
>&emsp;OAuth 2.0允许第三方网站在用户授权的前提下访问用户在服务商那里存储的各种信息。这种授权无需将用户提供用户名与密码提供给该第三方网站。实际上，OAuth 2.0 允许用户提供一个令牌给第三方网站，一个令牌对应一个特定的第三方网站，同时该令牌只能在特定的时间内访问特定的资源，用户在客户端使用用户名和密码在用户中心获得授权，然后客户端在访问应用是附上 Token 令牌。此时，应用接收到客户端的 Token 令牌到用户中心进行认证。
![picture](https://img-blog.csdnimg.cn/20190413115340328.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMyMjUyOTU3,size_16,color_FFFFFF,t_70)
这里Autho2.0只做简单介绍，有兴趣可以继续学习.
___
总结：
&emsp;希望大家能够对认证有一个比较清晰的认识，谢谢大家.