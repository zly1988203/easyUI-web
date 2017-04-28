<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ page import="com.okdeer.jxc.utils.UserUtil"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>退货申请-新增</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script  src="${ctx}/static/js/views/deliver/refund/DrAdd.js?1=113"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 umar-4  ubor">
		<input type='hidden' id="pageStatus" value="add">
		<form action="" id="queryForm" method="post">
			<div class="ub ub-ac upad-4">
				<div class="ubtns">
					<shiro:hasPermission name="JxcDeliverDR:add">
						<div class="ubtns-item" onClick="addDeliverDR()">新增</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcDeliverDR:add">
						<div class="ubtns-item" onclick="saveOrder()">保存</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcDeliverDR:audit">
						<div class="ubtns-item-disabled">审核</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcDeliverDR:delete">
						<div class="ubtns-item-disabled">删除</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="selectGoods()">商品选择</div>
					<shiro:hasPermission name="JxcDeliverDR:import">
						<div class="ubtns-item" onclick="toImportproduct(0)">导入货号</div>
						<div class="ubtns-item" onclick="toImportproduct(1)">导入条码</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcDeliverDR:export">
						<div class="ubtns-item-disabled">导出</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcDeliverDR:print">
						<div class="ubtns-item-disabled">打印</div>
					</shiro:hasPermission>
					<div class="ubtns-item" onclick="back()">关闭</div>
				</div>
			</div>
			<div class="ub umar-t8 uline"></div>
			<div class="ub umar-t10">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">制单机构:</div>
					<input type="hidden" name="sourceBranchId" id="sourceBranchId" class="uinp" />
					<input type="hidden" id="sourceBranchType" name="sourceBranchType" />
					<input type="text" name="sourceBranchName" id="sourceBranchName"class="uinp  ub ub-f1" readonly="readonly" onclick="selectSourceBranch()"/>
					<div class="uinp-more" id="source-btn" onclick="selectSourceBranch()">...</div>
				</div>
				<i class="ub ub-ac uc-red">*</i>
				<div class="ub ub-ac uw-300  umar-l80">
					<div class="umar-r10 uw-80 ut-r">制单人员:</div>
					<div class="utxt"><%=UserUtil.getCurrentUser().getUserName()%></div>
				</div>
				<div class="ub ub-ac umar-l10">
					<div class="umar-r10 uw-60 ut-r">制单时间:</div>
					<div class="utxt" id="createTime"></div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">收货机构:</div>
					<!--注意修改收货机构的name id-->
					<input type="hidden" name="targetBranchId" id="targetBranchId" class="uinp" />
					<input type="hidden" id="targetBranchType" name="targetBranchType" />
					<input type="text" name="targetBranchName" id="targetBranchName"class="uinp  ub ub-f1" readonly="readonly" onclick="selectTargetBranch()" />
					<div class="uinp-more" onclick="selectTargetBranch()">...</div>
				</div>
				<i class="ub ub-ac uc-red">*</i>
				<div class="ub ub-ac uw-300 umar-l80">
					<div class="umar-r10 uw-80 ut-r">修改人员:</div>
					<div class="utxt"></div>
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">修改时间:</div>
					<div class="utxt"></div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注:</div>
					<input class="uinp ub ub-f1" type="text" id="remark" name="remark">
				</div>
				<div class="ub ub-ac uw-300 umar-l84">
					<div class="umar-r10 uw-80 ut-r">审核人员:</div>
					<div class="utxt"></div>
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">审核时间:</div>
					<div class="utxt"></div>
				</div>
			</div>
		</form>
		<!--datagrid-edit-->
		<div class="ub ub-f1 datagrid-edit umar-t8">
			<table id="saleReturnAddForm"></table>
		</div>
	</div>
</body>
</html>
