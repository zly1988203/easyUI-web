<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>

<title>编辑分组</title>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="/static/js/views/sale/group/groupDialog.js?V=${versionNo}1"></script>

<div class="ub ub-ver  ub-f1  uw uh ufs-14 uc-black">
	<div class="ub ub-ac upad-4">
		<div class="ubtns">
			<button class="ubtns-item" onclick="updateGroup()" id="saveBtn">保存</button>
			<button class="ubtns-item" onclick="closeCardDialog()">关闭</button>
		</div>
	</div>
	<div class="ub uline"></div>
	<form id="groupAdd">
		<div class="ub ub-ver upad-4">
			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">分组编号:</div>
					<input class="uinp ub ub-f1 uinp-no-more" type="text" id="code"
						name="code" readOnly/>
				</div>
			</div>

			<div class="ub upad-4 umar-t10">
				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">排序:</div>
					<input  class="uinp easyui-numberbox easyui-validatebox"
					data-options="min:0,max:999,precision:0" type="text" id="sort"
						name="sort"/>
					<i class="uc-red">*</i>
				</div>
			</div>

			<div class="ub upad-4 umar-t10">

				<div class="ub ub-ac">
					<div class="umar-r10 uw-70 ut-r">分组名称:</div>
					<input class="uinp  easyui-validatebox"
						data-options="validType:'userName'"
						type="text" id="name"
						name="name" maxlength="16" />
						<i class="uc-red">*</i>
				</div>
			</div>
		</div>
	</form>
</div>

