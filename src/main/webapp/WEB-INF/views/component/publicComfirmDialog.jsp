<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<script src="${ctx}/static/js/views/component/publicComfirmDialog.js"></script>
<div id="confirmWin">
	<div style="padding:20px 20px 10px 30px">
		<div class="ub ub-ac" style="padding-bottom:20px;">
		<div id="content"></div>
		</div>
		
		<div class="ub ub-ac">
			<div class="ubtn umar-r20" onclick="confirmValue(1)">是</div>
			
			<div class="ubtn umar-r20" onclick="confirmValue(0)">否</div>
		
			<div class="ubtn umar-r20" onclick="confirmValue(2)">取消</div>
			
		</div>
	</div>

</div>