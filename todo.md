* [*] 充值是复用支付接口
* [*] 收入的详情页面,与接口对接
* [*] 设备的录入与编辑，增加场地的选择
* [*] 消费支付的弹窗，修改为最新的样式
* [*] 切换回到用户时，样式有闪烁在ios下
* [*] 选择优惠券后回到消费页面有闪烁
* [*] 场地列表的下拉刷新

* [*] 开发场地录入
* [*] 开发场地管理
* [ ] onshow的时候，不是群分享，清空global.lastShareInfo
* [ ] 开发我要提现
* [ ] 开发充值协议
* [*] 场地列表的搜索功能
* [*] 扫码享椅的消费模板的样式优化
* [*] 判断绑定的逻辑的放在选择消费模板的时候做
* [*] 菜单录入设备移动个人中心，只能管理员查看

# 发布前的checklist
* 微信支付接口的入参money要修改

[*] 1.优惠卷功能开发
[*] 2.设备录入增加场地选择
[*] 3.支付方式功能开发
    微信支付、微信支付+优惠价支付、摩豆支付+优惠价支付

6.接口调试：
[*] 用户信息
[*] 场地选择
[*] 设备录入
[*] 设备列表
[*] 扫描享坐
[*] 获取商品模版
[*] 摩豆支付
[*] 消费记录


# 待完善的
    场地选择
    优惠券列表

HTTP Status 500 - 执行SQL更新出错

type Exception report

message 执行SQL更新出错

description The server encountered an internal error that prevented it from fulfilling this request.

exception

com.powersi.hygeia.framework.exception.HygeiaException: 执行SQL更新出错
	com.powersi.hygeia.framework.util.DBFunc.executeUpdate(DBFunc.java:3089)
	com.powersi.hygeia.framework.util.DBHelper.executeUpdate(DBHelper.java:997)
	com.web.biz.consumer.dao.ConsumerDaoImpl.modifyConsumer(ConsumerDaoImpl.java:113)
	com.web.biz.consumer.service.ConsumerServiceImpl.saveConsumerInfo(ConsumerServiceImpl.java:37)
	com.web.api.person.MXZ01UserInfo.execute(MXZ01UserInfo.java:50)
	com.eclipower.framework.servlet.WebService.process(WebService.java:142)
	com.eclipower.framework.servlet.WebService.doPost(WebService.java:74)
	javax.servlet.http.HttpServlet.service(HttpServlet.java:647)
	javax.servlet.http.HttpServlet.service(HttpServlet.java:728)
	org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)
	com.web.filter.EncodingFilter.doFilter(EncodingFilter.java:47)
root cause

java.sql.SQLException: Lock wait timeout exceeded; try restarting transaction
	com.mysql.jdbc.SQLError.createSQLException(SQLError.java:1078)
	com.mysql.jdbc.MysqlIO.checkErrorPacket(MysqlIO.java:4190)
	com.mysql.jdbc.MysqlIO.checkErrorPacket(MysqlIO.java:4122)
	com.mysql.jdbc.MysqlIO.sendCommand(MysqlIO.java:2570)
	com.mysql.jdbc.MysqlIO.sqlQueryDirect(MysqlIO.java:2731)
	com.mysql.jdbc.ConnectionImpl.execSQL(ConnectionImpl.java:2818)
	com.mysql.jdbc.PreparedStatement.executeInternal(PreparedStatement.java:2157)
	com.mysql.jdbc.PreparedStatement.executeUpdate(PreparedStatement.java:2460)
	com.mysql.jdbc.PreparedStatement.executeUpdate(PreparedStatement.java:2377)
	com.mysql.jdbc.PreparedStatement.executeUpdate(PreparedStatement.java:2361)
	com.mchange.v2.c3p0.impl.NewProxyPreparedStatement.executeUpdate(NewProxyPreparedStatement.java:105)
	com.powersi.hygeia.framework.util.DBFunc.executeUpdate(DBFunc.java:3077)
	com.powersi.hygeia.framework.util.DBHelper.executeUpdate(DBHelper.java:997)
	com.web.biz.consumer.dao.ConsumerDaoImpl.modifyConsumer(ConsumerDaoImpl.java:113)
	com.web.biz.consumer.service.ConsumerServiceImpl.saveConsumerInfo(ConsumerServiceImpl.java:37)
	com.web.api.person.MXZ01UserInfo.execute(MXZ01UserInfo.java:50)
	com.eclipower.framework.servlet.WebService.process(WebService.java:142)
	com.eclipower.framework.servlet.WebService.doPost(WebService.java:74)
	javax.servlet.http.HttpServlet.service(HttpServlet.java:647)
	javax.servlet.http.HttpServlet.service(HttpServlet.java:728)
	org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)
	com.web.filter.EncodingFilter.doFilter(EncodingFilter.java:47)
note The full stack trace of the root cause is available in the Apache Tomcat/7.0.47 logs.

Apache Tomcat/7.0.47

---------------
HTTP Status 500 - 获取Statement出错

type Exception report

message 获取Statement出错

description The server encountered an internal error that prevented it from fulfilling this request.

exception

com.powersi.hygeia.framework.exception.HygeiaException: 获取Statement出错
	com.powersi.hygeia.framework.util.DBFunc.executeList(DBFunc.java:2218)
	com.powersi.hygeia.framework.util.DBHelper.executeList(DBHelper.java:486)
	com.web.biz.equipment.dao.EquipmentDaoImpl.qryEquipment(EquipmentDaoImpl.java:78)
	com.web.biz.equipment.service.EquipmentServiceImpl.qryNearbyEquipment(EquipmentServiceImpl.java:29)
	com.web.api.equipment.MXZ03Equipmet.execute(MXZ03Equipmet.java:49)
	com.eclipower.framework.servlet.WebService.process(WebService.java:142)
	com.eclipower.framework.servlet.WebService.doPost(WebService.java:74)
	javax.servlet.http.HttpServlet.service(HttpServlet.java:647)
	javax.servlet.http.HttpServlet.service(HttpServlet.java:728)
	org.apache.tomcat.websocket.server.WsFilter.doFilter(WsFilter.java:51)
	com.web.filter.EncodingFilter.doFilter(EncodingFilter.java:47)
root cause

com.mysql.jdbc.exceptions.jdbc4.MySQLNonTransientConnectionException: No operations allowed after connection closed.
	sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
	sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:57)
	sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
	java.lang.reflect.Constructor.newInstance(Constructor.java:526)
	com.mysql.jdbc.Util.handleNewInstance(Util.java:411)
	com.mysql.jdbc.Util.getInstance(Util.java:386)
	com.mysql.jdbc.SQLError.createSQLException(SQLError.java:1015)
	com.mysql.jdbc.SQLError.createSQLException(SQLError.java:989)
	com.mysql.jdbc.SQLError.createSQLException(SQLError.java:975)
	com.mysql.jdbc.SQLError.createSQLException(SQLError.java:920)
	com.mysql.jdbc.ConnectionImpl.throwConnectionClosedException(ConnectionImpl.java:1304)
	com.mysql.jdbc.ConnectionImpl.checkClosed(ConnectionImpl.java:1296)
	com.mysql.jdbc.ConnectionImpl.prepareStatement(ConnectionImpl.java:4514)
	com.mysql.jdbc.ConnectionImpl.prepareStatement(ConnectionImpl.java:4479)
	sun.reflect.GeneratedMethodAccessor37.invoke(Unknown Source)
	sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:43)
	java.lang.reflect.Method.invoke(Method.java:606)
	com.mchange.v2.c3p0.stmt.GooGooStatementCache$1StmtAcquireTask.run(GooGooStatementCache.java:525)
	com.mchange.v2.async.ThreadPoolAsynchronousRunner$PoolThread.run(ThreadPoolAsynchronousRunner.java:547)
root cause

com.mysql.jdbc.exceptions.jdbc4.CommunicationsException: Communications link failure

The last packet successfully received from the server was 861,834,959 milliseconds ago.  The last packet sent successfully to the server was 861,834,981 milliseconds ago.
	sun.reflect.NativeConstructorAccessorImpl.newInstance0(Native Method)
	sun.reflect.NativeConstructorAccessorImpl.newInstance(NativeConstructorAccessorImpl.java:57)
	sun.reflect.DelegatingConstructorAccessorImpl.newInstance(DelegatingConstructorAccessorImpl.java:45)
	java.lang.reflect.Constructor.newInstance(Constructor.java:526)
	com.mysql.jdbc.Util.handleNewInstance(Util.java:411)
	com.mysql.jdbc.SQLError.createCommunicationsException(SQLError.java:1121)
	com.mysql.jdbc.MysqlIO.send(MysqlIO.java:3941)
	com.mysql.jdbc.MysqlIO.sendCommand(MysqlIO.java:2551)
	com.mysql.jdbc.MysqlIO.sqlQueryDirect(MysqlIO.java:2731)
	com.mysql.jdbc.ConnectionImpl.execSQL(ConnectionImpl.java:2812)
	com.mysql.jdbc.ConnectionImpl.commit(ConnectionImpl.java:1732)
	com.mchange.v2.c3p0.impl.NewProxyConnection.commit(NewProxyConnection.java:803)
	com.powersi.hygeia.framework.util.DBFunc.commit(DBFunc.java:1108)
	com.powersi.hygeia.framework.DBConnectionController.commit(DBConnectionController.java:91)
	com.powersi.hygeia.framework.util.DBHelper.commit(DBHelper.java:177)
	com.web.interceptor.BaseActionInterceptor.intercept(BaseActionInterceptor.java:53)
	com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:248)
	org.apache.struts2.impl.StrutsActionProxy.execute(StrutsActionProxy.java:52)
	org.apache.struts2.dispatcher.Dispatcher.serviceAction(Dispatcher.java:485)
	org.apache.struts2.dispatcher.ng.ExecuteOperations.executeAction(ExecuteOperations.java:77)
	com.powersi.hygeia.web.filter.StrutsFilter.doFilter(StrutsFilter.java:95)
	com.web.filter.EncodingFilter.doFilter(EncodingFilter.java:47)
root cause

java.net.SocketException: Connection reset
	java.net.SocketOutputStream.socketWrite(SocketOutputStream.java:118)
	java.net.SocketOutputStream.write(SocketOutputStream.java:159)
	java.io.BufferedOutputStream.flushBuffer(BufferedOutputStream.java:82)
	java.io.BufferedOutputStream.flush(BufferedOutputStream.java:140)
	com.mysql.jdbc.MysqlIO.send(MysqlIO.java:3922)
	com.mysql.jdbc.MysqlIO.sendCommand(MysqlIO.java:2551)
	com.mysql.jdbc.MysqlIO.sqlQueryDirect(MysqlIO.java:2731)
	com.mysql.jdbc.ConnectionImpl.execSQL(ConnectionImpl.java:2812)
	com.mysql.jdbc.ConnectionImpl.commit(ConnectionImpl.java:1732)
	com.mchange.v2.c3p0.impl.NewProxyConnection.commit(NewProxyConnection.java:803)
	com.powersi.hygeia.framework.util.DBFunc.commit(DBFunc.java:1108)
	com.powersi.hygeia.framework.DBConnectionController.commit(DBConnectionController.java:91)
	com.powersi.hygeia.framework.util.DBHelper.commit(DBHelper.java:177)
	com.web.interceptor.BaseActionInterceptor.intercept(BaseActionInterceptor.java:53)
	com.opensymphony.xwork2.DefaultActionInvocation.invoke(DefaultActionInvocation.java:248)
	org.apache.struts2.impl.StrutsActionProxy.execute(StrutsActionProxy.java:52)
	org.apache.struts2.dispatcher.Dispatcher.serviceAction(Dispatcher.java:485)
	org.apache.struts2.dispatcher.ng.ExecuteOperations.executeAction(ExecuteOperations.java:77)
	com.powersi.hygeia.web.filter.StrutsFilter.doFilter(StrutsFilter.java:95)
	com.web.filter.EncodingFilter.doFilter(EncodingFilter.java:47)
note The full stack trace of the root cause is available in the Apache Tomcat/7.0.47 logs.

Apache Tomcat/7.0.47
