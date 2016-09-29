<!--操作员，区域机构 ,字典公共组件公用jsp  -->
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="${ctx}/static/js/views/component/publicOperator.js"></script>

<div class="ub ub-ver ub-pc ub-ac uw uh ub-f1">
	<div class="ub ub-ver uh ub-f1 uw">
		<form action="" id="formOperator">
			<div class="ub ub-ac upad-10 ">
				<div class="ub ub-ac uw">
					<div class="umar-r10">关键字:</div>
					<input value="${type}" id="type" type="hidden">
					<input value="${check}" id="hiddenCheck" type="hidden">
					<input value="${dictType}" id="dictType" type="hidden"> 
					<input class="usearch uinp ub ub-f1" type="text" placeholder="输入编号/名称"
						name="nameOrCode">
					<div class="ubtn umar-l20" onclick="cx()">查询</div>
				</div>
			</div>
		</form>

		<div class="ub uw uh ub-f1">
			<table id="gridOperator" ></table>
		</div>
	</div>
</div>
