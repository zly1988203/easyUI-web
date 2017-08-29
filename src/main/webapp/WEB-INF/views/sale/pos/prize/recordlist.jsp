
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>会员活动领取记录</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
	<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
	<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
	<c:set var="ctx" value="${pageContext.request.contextPath}" />
<script src="${ctx}/static/js/views/sale/prize/recordList.js?V=${versionNo}4"></script>
	<style>
	.datagrid-header-row .datagrid-cell {
	text-align: center !important;
	}
	</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm">
			<div class="ub ub-ac">
				<div class="ubtns">
					<shiro:hasPermission name="posPrizeRecord:search">
						<div class="ubtns-item" onclick="queryRecord()">查询</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="posPrizeRecord:export">
						<div class="ubtns-item" onclick="exportData()">导出</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
					<input type="hidden" id="startCount" name="startCount" />
					<input type="hidden" id="endCount" name="endCount" />
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">奖品名称:</div>
					<input class="uinp" name="prizeName" id="prizeName" type="text">
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-70 ut-r">会员号:</div>
                    <input class="uinp" name="mobile" id="mobile" type="text">
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-70 ut-r">活动类型:</div>
					<select class="uselect easyui-combobox" name="formType" id="formType"
							data-options="editable:false">
						<option value="">全部</option>
						<option value="1">抽奖</option>
					</select>

				</div>
			</div>
			<div class="ub umar-t8">

				<div class="ub ub-ac umar-r40" id="branchTemp">
					<div class="umar-r10 uw-60 ut-r">活动机构:</div>
					<input class="uinp ub ub-f1" type="hidden" id="branchId"
					name="branchId"> <input class="uinp ub ub-f1" type="text"
					id="branchName" name="branchName">
					<div class="uinp-more">...</div>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">奖品状态:</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="prizeStatus" id="status_no"
							   value="1" checked="checked" /><label for="status_no">未领取
					</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="prizeStatus"
							   id="status_yes" value="2" /><label for="status_yes">已领取
					</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" id="status_over" name="prizeStatus" value="9" /><label for="status_over">已过期
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="prizeStatus"
							   id="status_all" value="4" /><label for="status_all">全部</label>
					</div>
				</div>

			</div>

		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridRecordList"></table>
		</div>

	</div>
</body>
</html>