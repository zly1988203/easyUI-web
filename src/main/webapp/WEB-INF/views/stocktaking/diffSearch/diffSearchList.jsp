<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>盘点差异查询</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
    <script  src="${ctx}/static/js/views/stocktaking/diffSearch/diffSearchList.js?V=${versionNo}"></script>
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
                <div class="ubtns-item" onclick="printDiffSearchList()">打印</div>
                <div class="ubtns-item" onclick="exportDiffSearchData()">导出</div>
                <div class="ubtns-item" id="set" onclick="gFunRefresh()" >重置</div>
                <div class="ubtns-item" onclick="toClose()">退出</div>
            </div>
			<div class="ub">
				<div class="ub ub-ac">
					<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
				</div>
			</div>
		</div>
		<div class="ub uline umar-t8"></div>
		<div class="ub umar-t8">
			<div class="ub ub-ac">
				<div class="umar-r10 uw-70 ut-r">机构:</div>
                <input type="hidden" name="startCount" id="startCount" value="">
                <input type="hidden" name="endCount" id="endCount" value="">
				<input type="hidden" id="branchId" name="branchId" value="${batchVo.branchId }"/>
				<input type="hidden" id="branchCompleCode" name="branchCompleCode"/>
				<input type="hidden" id="oldBranchName" >
				<input class="uinp ub ub-f1" type="text" id="branchName" name="branchName" value="${batchVo.branchName }" maxlength="50"/>
				<div class="uinp-more" onclick="selectBranches()" >...</div>
			</div>
			<div class="ub ub-ac uw-300 umar-l20">
				<div class="umar-r10 uw-70 ut-r">盘点批号:</div>
				<input type="hidden" id="oldbatchNo" >
				<input type="hidden" id="batchId" name ="batchId" >
				<input class="uinp ub ub-f1" type="text" name="batchNo" id="batchNo" readonly="readonly" onClick="searchTakeStock()"/>
				<div class="uinp-more" onClick="searchTakeStock()">...</div>

			</div>
				<div class='umar-t10 umar-l10' id="divEqualZero" hidden="true">
					<label>
					<input class="checkItem" type="checkbox" id="equalZero" name="equalZero" value="0">显示差异为0的商品
					</label>
				</div>
			
		</div>
		
		<div class="ub umar-t8">
			<div class="ub ub-ac">
				<div class="umar-r10 uw-70 ut-r">商品选择:</div>
				<input type="hidden" id="oldskuName" >
				<input class="uinp ub ub-f1" type="hidden" name="skuId" id="skuId" />
				<input class="uinp ub ub-f1" type="text" name="skuName" id="skuName"  disabled="disabled"/>
				<div class="uinp-more" id="divgood" onClick="selectGoods()" hidden="true">...</div>
			</div>
			<div class="ub ub-ac uw-300 umar-l20">
				<div class="umar-r10 uw-70 ut-r">类别:</div>
				<input type="hidden" id="oldCategoryName" >
				<input type="hidden" name="categoryCode" id="categoryCode" />
				<input type="hidden" name="categoryId" id="categoryId" />
				<input class="uinp ub ub-f1" type="text" name="categoryName" id="categoryName" disabled="disabled"/>
				<div id='categoryDiv' class="uinp-more category"  onClick="searchCategory()" hidden="true">...</div>
			</div>
			
			<div class="ub ub-ac umar-l10">
				<div class="ub ub-ac umar-r10">
					<label> <input class="radioItem" type="radio"  value="1" checked name="rotation">汇总</label>
				</div>
				<div class="ub ub-ac umar-r10">
					<label> <input class="radioItem" type="radio"  value="3" name="rotation">类别汇总 </label>
				</div>
				<div class="ub ub-ac umar-r10">
					<label> <input class="radioItem" type="radio"  value="2" name="rotation">商品明细 </label>
				</div>
				<input type="hidden" id="rotationType" name="rotationType" value='1'/>
			</div>
			

		</div>
      	</form>
       <div class="ub ub-f1  umar-t8 umar-b8">
		<table id="diffSearchList"></table>
	</div>
   </div>
</body>
</html>
