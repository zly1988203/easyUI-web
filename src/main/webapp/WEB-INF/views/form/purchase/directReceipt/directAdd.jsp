<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>新增直送收货单</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<script src="${ctx}/static/js/views/purchase/directReceipt/directReceipt.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<input type='hidden' id="directStatus" value="add">
	<input type='hidden' id="cascadeGoods" name="cascadeGoods" value="${cascadeGoods}">
	<div class="ub ub-ver ub-f1 umar-4  ubor">
		<div class="ub ub-ac upad-4">
			<div class="ubtns">
				<shiro:hasPermission name="JxcDirectReceipt:add">
					<div  class="ubtns-item" onclick="addDirect()">新增</div>
				</shiro:hasPermission>
				<shiro:hasPermission name="JxcDirectReceipt:add">
					<div  class="ubtns-item" onclick="saveDirectForm()">保存</div>
				</shiro:hasPermission>
				<shiro:hasPermission name="JxcDirectReceipt:audit">
					<div  class="ubtns-item-disabled">审核</div>
				</shiro:hasPermission>
				<div class="ubtns-item" onclick="selectGoods()">商品选择</div>
				<shiro:hasPermission name="JxcDirectReceipt:import">
					<div class="ubtns-item" onclick="importDirectForm(0)">导入货号</div>
					<div class="ubtns-item" onclick="importDirectForm(1)">导入条码</div>
				</shiro:hasPermission>				
				<shiro:hasPermission name="JxcDirectReceipt:export">
					<div class="ubtns-item-disabled">导出</div>
				</shiro:hasPermission>
				<shiro:hasPermission name="JxcDirectReceipt:print">
					<div class="ubtns-item-disabled">打印</div>
				</shiro:hasPermission>
				<shiro:hasPermission name="JxcDirectReceipt:setting">
					<div class="ubtns-item-disabled">设置</div>
				</shiro:hasPermission>
				<div class="ubtns-item" onclick="toClose()">关闭</div>
			</div>
		</div>
		<form id="addqueryForm" action="" method="post">
			<div class="ub umar-t10">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-60 ut-r">供应商:</div>
					<input class="uinp" name="supplierId" id="supplierId" type="hidden" > 
					<input class="uinp easyui-validatebox" data-options="required:true" id="supplierName" type="text" onclick="selectSupplier()" readonly="readonly">
					<div class="uinp-more" onclick="selectSupplier()">...</div>
				</div>
				<div class="ub ub-ac uselectw umar-l00 umar-l10">
					<div class="umar-r10 uw-70 ut-r">经营方式:</div>
					<input type="hidden" name="saleWay" id="saleWay" /> 
					<input type="text" name="saleWayName" id="saleWayName" class="uinp ub ub-f1" readonly="readonly" />
				</div>
				<div class="ub ub-ac umar-l40 uw-300 ">
					<div class="umar-r10 uw-70 ut-r">制单人员:</div>
					<div class="utxt">${sessionScope.session_user.userName }</div>
				</div>
				<div class="ub ub-ac umar-l10">
					<div class="umar-r10 uw-60 ut-r">制单时间:</div>
					<input type="hidden" name=createTime id="hidcreateTime" />
					<div class="utxt" id="createTime"></div>
				</div>
			</div>

			<div class="ub umar-t8">
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-60 ut-r">收货机构:</div>
					<input class="uinp" name="branchId" id="branchId" type="hidden">
					<input id="branchName" class="uinp easyui-validatebox" data-options="required:true" type="text" onclick="selectBranch()">
					<div class="uinp-more" onclick="selectBranch()">...</div>
				</div>

				<div class="ub ub-ac umar-l10"></div>

				<div class="ub ub-ac umar-l40 uw-300">
					<div class="umar-r10 uw-70 ut-r">最后修改人:</div>
					<div class="utxt"></div>
				</div>
				<div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">修改时间:</div>
					<div class="utxt"></div>
				</div>

			</div>

			<div class="ub umar-t8">

				<div class="ub ub-ac uw-592">
					<div class="umar-r10 uw-60 ut-r">备注:</div>
					<input class="uinp ub ub-f1" type="text" id="remark" name="remark" maxlength="40">
				</div>

				<div class="ub ub-ac umar-l40 uw-300">
					<div class="umar-r10 uw-70 ut-r">审核人员:</div>
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
			<table id="gridDirectDetail"></table>
		</div>
		
	</div>
	

</body>
</html>