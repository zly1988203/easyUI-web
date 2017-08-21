
<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>Pos客屏活动管理</title>

<%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
    <%@ taglib prefix="shiro" uri="http://shiro.apache.org/tags"%>
<script src="${ctx}/static/js/views/sale/wheelsurf/wheelsurflist.js?V=${versionNo}"></script>
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
					<shiro:hasPermission name="posWheelsurfForm:search">
						<div class="ubtns-item" onclick="queryPosActivity()">查询</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="posWheelsurfForm:add">
						<div class="ubtns-item" onclick="addPosActivity()">新增</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="posWheelsurfForm:copy">
						<div class="ubtns-item" onclick="copyPosActivity()">复制</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="posWheelsurfForm:delete">
						<div class="ubtns-item" onclick="delPosActivity()">删除</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>

				<!-- 引入时间选择控件 -->
				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40" id="branchTemp">
					<div class="umar-r10 uw-60 ut-r">活动店铺:</div>
                    <input class="uinp ub ub-f1" type="hidden" id="branchId"
                    name="branchId"> <input class="uinp ub ub-f1" type="text"
                    id="branchName" name="branchName">
                    <div class="uinp-more">...</div>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">活动编号:</div>
                    <input class="uinp" name="formNo" id="formNo" type="text">
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

				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">活动名称:</div>
					<input class="uinp" name="wheelsurfName" id="wheelsurfName" type="text">
				</div>

				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-60 ut-r">审核状态:</div>
                    <div class="ub ub-ac umar-r10">
                    <input class="radioItem" type="radio" name="auditStatus"
                    id="status_all" value="" /><label for="status_all">全部</label>
                    </div>

					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="auditStatus" id="status_no"
							value="0" checked="checked" /><label for="status_no">未审核
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<input class="radioItem" type="radio" name="auditStatus"
							id="status_yes" value="1" /><label for="status_yes">已审核
						</label>
					</div>

                    <div class="ub ub-ac umar-r10">
                    <input class="radioItem" type="radio" name="auditStatus"
                    id="status_over" value="2" /><label for="status_over">已终止
                    </label>
                    </div>

				</div>
			</div>

		</form>
		<div class="ub uw umar-t8 ub-f1">
			<table id="gridPosActivity"></table>
		</div>

	</div>
</body>
</html>