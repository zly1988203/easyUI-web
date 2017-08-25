<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>新增pos客屏活动</title>

    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
	<script src="${ctx}/static/js/views/sale/wheelsurf/wheelsurfAdd.js?V=${versionNo}3"></script>
	<style>
	.datagrid-header-row .datagrid-cell {
	text-align: center !important;
	}

	</style>

</head>
<body class="ub ub-ver uw uh ufs-14 uc-black">
	<c:choose>
		<c:when test="${form.id != null}">
			<input type='hidden' id="copyId" name="copyId" value="${form.id}">
			<input type='hidden' id="pageStatus" name="pageStatus" value="copy">
		</c:when>
		<c:otherwise>
			<input type='hidden' id="pageStatus" name="pageStatus" value="add">
		</c:otherwise>
	</c:choose>
	<div class="ub ub-ver ub-f1 umar-4  ubor">
		<div class="ub ub-ac upad-4">
			<div class="ubtns">
				<div class="ubtns-item" onclick="selectPrize()">奖品选择</div>
				<div class="ubtns-item" onclick="uploadPic()">上传图片</div>
				<div class="ubtns-item" onclick="saveWheelsurf()">保存</div>
				<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
				<div class="ubtns-item" onclick="toClose()">关闭</div>
			</div>
		</div>
		<form id="formAdd">
			<div class="ub ub-ver ">
				<div class="ub umar-t8 umar-l4">
					<div class="ub ub-ac umar-r20">
						<div class="umar-r10 uw-60 ut-r">活动时间:</div>
						<input id="beginTime" name="beginTime" class="Wdate easyui-validatebox"
						data-options="required:true" type="text"
						onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true})" />
	至
						<input id="overTime" name="overTime" class="Wdate easyui-validatebox"
						data-options="required:true" type="text"
						onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true,minDate:'#F{$dp.$D(\'beginTime\')}'})" />
					</div>
					<div class="ub ub-ac umar-r20">
						<div class="umar-r10 uw-80 ut-r">奖品有效期:</div>
						<input id="validBeginTime" name="validBeginTime" class="Wdate easyui-validatebox"
							data-options="required:true" type="text"
							onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true,minDate:'#F{$dp.$D(\'beginTime\')}'})" value="<fmt:formatDate value="${form.validBeginTime}" pattern="yyyy-MM-dd"/>"/>
	至
						<input id="validOverTime" name="validOverTime" class="Wdate easyui-validatebox"
						data-options="required:true" type="text"
						onFocus="WdatePicker({dateFmt:'yyyy-MM-dd',readOnly:true,minDate:'#F{$dp.$D(\'overTime\')}'})" value="<fmt:formatDate value="${form.validOverTime}" pattern="yyyy-MM-dd"/>"/>
					</div>

				</div>
				<div class="ub umar-t8 umar-l4">
					<div class="ub ub-ac umar-r30">
						<div class="umar-r10 uw-60 ut-r">活动名称:</div>
						<input id="wheelsurfName" name="wheelsurfName" class="uinp uw-416" type="text" value="<c:out value="${form.wheelsurfName}"/>" >
					</div>
					<div class="ub ub-ac umar-r20">
						<div class="umar-r10 uw-70 ut-r">活动类型:</div>
						<select class="uselect easyui-combobox" style="width:420px;" name="formType" id="formType"
						data-options="editable:false">
						<%--<option value="">全部</option>--%>
							<c:choose>
								<c:when test="${form.formType eq '1'}">
									<option value="1" selected>抽奖</option>
								</c:when>
								<c:otherwise>
									<option value="1" selected>抽奖</option>
								</c:otherwise>
							</c:choose>
						</select>

					</div>

				</div>
				<div class="ub umar-t8 umar-l4">
					<div class="ub ub-ac umar-r40" id="branchTemp">
					<div class="umar-r10 uw-60 ut-r">活动机构:</div>
					<input class="uinp ub ub-f1" type="hidden" id="branchIds"
					name="branchIds"> <input class="uinp ub ub-f1 uw-416" type="text"
					id="branchName" name="branchName">
					<div class="uinp-more">...</div>
					</div>
					<div class="ub ub-ac umar-r20">
					<div class="umar-r10 uw-60 ut-r">抽奖次数:</div>
					<input  name="wheelsurfTime"
						id="wheelsurfTime" class="uinp uw-416 easyui-numberbox easyui-validatebox"
						data-options="min:1,max:999999,precision:0" type="text" value="<c:out value="${form.wheelsurfTime}"/>">
					</div>
				</div>
			</div>
		</form>

		<form id="gridAddForm" class="ub uw umar-t8 ub-f1">
			<table id="gridAddPosAct"></table>
		</form>
	</div>

</body>
</html>