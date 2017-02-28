<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<!DOCTYPE html> 
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="Refresh" content="600000;url=${ctx}/sessionKeeper"> 
<title>session keeper</title>
</head>
<body>
hello,world!
<script id=Back language=javascript></script>
<script language=javascript>   
function keepsession(){   
	document.all["Back"].src="${ctx}/sessionKeeper?RandStr="+Math.random();
	//这里的RandStr=Math.random只是为了让每次back.src的值不同，防止同一地址刷新无效的情况   
	window.setTimeout("keepsession()",600000); //每隔900秒调用一下本身   
}   
keepsession();
</script>
</body>
</html>