<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>pos订单处理页面</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<shiro:hasPermission name="jxcPosOrderPay:handler">
				<div class="ubtns-item" onclick="handler()">处理</div>
		   	</shiro:hasPermission>
			<div class="ubtns-item" onclick="toClose()">关闭</div>
		</div>
	</div>
	<div class="ub ub-ver ub-f1 umar-4 ubor upad-10">
		<div class="ub ub-ver umar-t20">
			<form id="posOrderPayForm" action="${ctx}/pos/orderPay/updateTradeOrderInfo" method="post">
				<div class="ub ub-ac upad-16 ">
					<div class="umar-r10 uw-60 ut-r">订单号:</div>
					<div class="ub ub-ac umar-r10 uw-100">
						<input type="text"  placeholder="订单号" name="orderNo" id="orderNo">
					</div>
				</div>
			</form>
			
		</div>
	</div>
</body>
<script type="text/javascript">
$("#posOrderPayForm").form({
	onSubmit : function() {
		gFunStartLoading('正在保存，请稍后...');
		return true;
	},
	success:function(data){
		var result = JSON.parse(data);
		gFunEndLoading();
           if(result['code'] == 0){
        	   gFunEndLoading();
               messager("处理成功！");
           }else{
               successTip(result['message']);
               gFunEndLoading();
           }
       } ,error:function(data){
    	   gFunEndLoading();
           successTip("请求发送失败或服务器处理失败");
       }
});

function handler(){
	$("#posOrderPayForm").submit();
}
</script>
</html>