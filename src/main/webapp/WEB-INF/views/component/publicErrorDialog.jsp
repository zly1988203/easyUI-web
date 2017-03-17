<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/component/publicErrorDialog.js"></script>
<script type="text/javascript" src="//cdnjs.cloudflare.com/ajax/libs/zeroclipboard/2.1.6/ZeroClipboard.min.js" ></script>

<div>
	<div style="padding: 20px 20px 10px 20px">
		<div class="ub ub-ac" style="padding-bottom: 10px;">
			<textarea rows="10" cols="50" id="content"></textarea>
		</div>
		<div class="ub ub-ac ub-pc">
			<!-- <div class="ubtn umar-r20" onclick="copyErrorData">复制</div> -->
			<div class="ubtn umar-r20" onclick="closeErrorDialog();">关闭</div>
		</div>
	</div>
</div>