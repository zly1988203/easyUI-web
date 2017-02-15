<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>库存存量指标</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%-- <script  src="${ctx}/static/js/fun/publicComponent.js"></script> --%>
    <script  src="${ctx}/static/js/views/stockIndex/stockIndexList.js"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">

   <div class="ub ub-ver ub-f1 umar-4 upad-4">
	<form id="queryForm" action="" method="post">
		<div class="ub ub-ac">
            <div class="ubtns">
                <div class="ubtns-item" onclick="queryForm()">查询</div>
                <div class="ubtns-item" onclick="updateMore()">批量修改</div>
                <div class="ubtns-item" id="set" onclick="gFunRefresh()" >重置</div>
                <div class="ubtns-item" onclick="toClose()">退出</div>
            </div>
		</div>
		<div class="ub umar-t8">
			<div class="ub ub-ac">
				<div class="umar-r10 uw-70 ut-r">机构名称:</div>
				<input type="hidden" id="createBranchId" name="createBranchId" />
				<input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" maxlength="50"/>
				<div class="uinp-more" onclick="selectBranches()" >...</div>
			</div>

			<div class="ub ub-ac uw-300 umar-l40">
				<div class="umar-r10 uw-70 ut-r">货号/条码:</div>
				<input class="uinp" type="text" id="goodsBNum">
			</div>

			<div class="ub ub-ac umar-l20">
				<div class="umar-r10 uw-70 ut-r">商品类别:</div>
				<input class="uinp ub ub-f1" type="hidden" id="categoryCode" />
				<input class="uinp ub ub-f1" type="text" id="categoryNameCode" />
				<div class="uinp-more" onClick="searchCategory()">...</div>
			</div>
		</div>
		<div class="ub umar-t8">
			<div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-70 ut-r">库存上限:</div>
				<input class="uinp" type="text" name="stockBegin" id="stockBegin"/>
			</div>
			<div class="ub ub-ac uw-300 umar-l20">
				<div class="umar-r10 uw-70 ut-r">库存下限:</div>
				<input class="uinp" type="text" name="stockEnd" id="stockEnd"/>
			</div>
		</div>

      	</form>
       <div class="ub ub-f1  umar-t8 umar-b8">
		<table id="stockIndexList"></table>
	</div>
   </div>

	<!--详情弹框 --->
	<div id="detailDailog" class="easyui-dialog" title="库存指标详情" style="width:780px;height:280px;" data-options="modal:true">
		<div class="ub ub-ver upad-10 ">
		    <div class="ub ub-ac">
				<div class="ubtns">
					<div class="ubtns-item" onClick="saveDetailStock()">保存</div>
					<div class="ubtns-item" onClick="closeDetailDialog()">返回</div>
				</div>
			</div>
			<div class="ub uline umar-t10"></div>
			<div class="ub umar-t10">
				<div class="ub ub-ac ">
					<div class="ub umar-r10">机构名称:</div>
					<input type="hidden" id="detailBranchId" name="detailBranchId" />
					<input type="text" class="ub uinp" id="detailBranchName" value="" readonly="readonly" name="detailBranchName"/>
					<div class="uinp-more" onClick="selectDetailBranches()">...</div>
				</div>
			</div>
	
			<div class="ub ub-f1 umar-t10 umar-b10 uh-100">
				<table id="detailStockTarget"></table>
			</div>
	
		</div>
	
	</div>

</body>
</html>
