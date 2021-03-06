<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>领用查询</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<%-- <script  src="${ctx}/static/js/fun/publicComponent.js"></script> --%>
<script src="${ctx}/static/js/views/stockLead/stockLeadSearchList.js?V=${versionNo}"></script>
<style>
.datagrid-header .datagrid-cell {
	text-align: center !important;
	font-weight: bold;
}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onclick="queryForm()">查询</div>
					<shiro:hasPermission name="JxcLeadSearch:export">
				        <input type="hidden" id="startCount" name="startCount"/>
				        <input type="hidden" id="endCount" name="endCount"/>
						<div class="ubtns-item" onclick="exportLeadSearchList()">导出</div>
					</shiro:hasPermission>
					<div class="ubtns-item" id="set" onclick="gFunRefresh()">重置</div>
					<div class="ubtns-item" onclick="toClose()">关闭</div>
				</div>
				<!-- 引入时间选择控件 -->

				<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
			</div>
			<div class="ub uline umar-t8"></div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40" id="branchSelect">
					<div class="umar-r10 uw-70 ut-r">机构:</div>
					<input type="hidden" id="branchId" name="branchId" />
	                <input type="hidden" id="isContainChildren" name="isContainChildren"/>
					<input class="uinp ub ub-f1" type="text" id="branchName" maxlength="50" />
					<div class="uinp-more">...</div>
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-70 ut-r">单号:</div>
					<input class="uinp" type="text" id="formNo" name="formNo">
				</div>
				<div class="ub ub-ac umar-r40" id="categorySelect">
					<div class="umar-r10 uw-70 ut-r">商品类别:</div>
					<input type="hidden" id="categoryCode" name="categoryCode" />
					<input class="uinp ub ub-f1" type="text" id="categoryCodeName" name="categoryCodeName" maxlength="50"/>
					<div class="uinp-more">...</div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-70 ut-r">商品名称:</div>
					<input class="uinp" type="text" id="skuName" name="skuName">
				</div>
				<div class="ub ub-ac umar-r40">
					<div class="umar-r10 uw-70 ut-r">货号/条码:</div>
					<input class="uinp" type="text" id="skuCode" name="skuCode">
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">报表类型:</div>
					<div class="ub ub-ac umar-r10">
						<label>
						<input class="radioItem" type="radio" name="type" value="1" checked="checked" />
						<span>领用明细</span>
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<label>
						<input class="radioItem" type="radio" name="type" value="2" /><span>商品汇总</span>
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<label>
						<input class="radioItem" type="radio" name="type" value="3" /><span>类别汇总</span>
						</label>
						<div id="categoryTypeDiv">
							<select class="easyui-combobox uselect" name="categoryType" data-options="editable:false,onChange:onChangeSelect"
									id="categoryType">
								<option value="1">一级类别</option>
								<option value="2">二级类别</option>
							</select>
						</div>
					</div>
				</div>
			</div>

		</form>
		<div class="ub ub-f1  umar-t8 umar-b8">
			<table id="leadSearchList"></table>
		</div>
	</div>

</body>
</html>
