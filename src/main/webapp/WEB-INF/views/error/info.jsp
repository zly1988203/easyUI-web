<%@ page contentType="text/html;charset=UTF-8" isErrorPage="true" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="org.slf4j.Logger,org.slf4j.LoggerFactory" %>
<%response.setStatus(200);%>
<!DOCTYPE html>
<html>
<head>
	<title>错误信息提醒</title>
</head>

<body>
	<c:if test="${not empty errorMsg }">
		<h3>${errorMsg }</h3>
	</c:if>
</body>
</html>
