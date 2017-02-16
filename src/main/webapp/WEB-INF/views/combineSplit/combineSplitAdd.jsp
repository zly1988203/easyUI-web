<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>组合拆分单-新增</title>
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%-- <script  src="${ctx}/static/js/fun/publicComponent.js"></script> --%>
    <script  src="${ctx}/static/js/views/combineSplit/combineSplitAdd.js"></script>
    <style>
    .datagrid-header .datagrid-cell {text-align: center!important;font-weight: bold;}
    </style>
</head>
<body class="ub uw uh ufs-14 uc-black">
	<div class="ub ub-ver ub-f1 upad-8">
		<form action=""  id="searchForm" method="post">
			<div class="ub ub-ac">
				<div class="ubtns">
	                <div class="ubtns-item" onclick="modifyPriceOrderCx();">保存</div>
					<div class="ubtns-item" onclick="addCombineSplit();">商品选择</div>
		            <div class="ubtns-item" onclick="delModifyOrderDialog();">删单</div>
		            <div class="ubtns-item" onclick="window.parent.closeTab()">关闭</div>
	            </div>
			</div>
			<div class="ub uline umar-t8"></div>
			<div class="ub umar-t12">
				<div class="ub ub-ac uw-280">
					 <div class="umar-r10 uw-70 ut-r" >机构:</div>
                     <input class="uinp ub ub-f1" name="createBranchId" type="hidden" id="createBranchId" >
                     <input class="uinp ub ub-f1"  type="text" id="createBranchName">
                     <div class="uinp-more" onclick="selectBranch();">...</div>
				</div>	
               <div class="ub ub-ac uw-280">
                    <div class="umar-r10 uw-70 ut-r">方式:</div>
                       <!--select-->
				        <select class="easyui-combobox uselect" name="io" id="io" data-options="editable:false,onChange:selectTion" >
								<option value="1" >组合</option> 
								<option value="2" >拆分</option>
				        </select>
                </div>
				<div class="ub ub-ac uw-280 umar-l20 opa-0"></div>
				<div class="ub ub-ac uw-140 umar-l40">
					 <div class="umar-r10 ut-r" >制单人员: xxxxxxxxx</div>
				</div>
				<div class="ub ub-ac uw-180 umar-l20">
					 <div class="umar-r10 ut-r" >制单日期: 2017-02-07</div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-280">
					 <div class="umar-r10 uw-70 ut-r" >商品:</div>
                     <input class="uinp ub ub-f1"  type="text" id="createBranchName">
				</div>	
				<div class="ub ub-ac uw-280 umar-l20">
					 <div class="umar-r10 uw-70 ut-r" >单价:</div>
                     <input class="uinp ub ub-f1"  type="text" id="createBranchName">
				</div> 
				<div class="ub ub-ac uw-140 umar-l40">
					 <div class="umar-r10 ut-r" >审核人员: xxxxxxxxx</div>
				</div>
				<div class="ub ub-ac uw-180 umar-l20">
					 <div class="umar-r10 ut-r" >审核日期: 2017-02-07</div>
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-280">
					 <div class="umar-r10 uw-70 ut-r" >金额:</div>
                     <input class="uinp ub ub-f1"  type="text" id="createBranchName">
				</div>	
				<div class="ub ub-ac uw-280 umar-l20">
					 <div class="umar-r10 uw-70 ut-r" >数量:</div>
                     <input class="uinp ub ub-f1"  type="text" id="createBranchName">
				</div>
			</div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-580">
					 <div class="umar-r10 uw-70 ut-r" >备注:</div>
                     <input class="uinp ub ub-f1"  type="text" id="createBranchName">
				</div>	
			</div>
		</form>
		<div class="ub ub-f1 umar-t8">
			<table id="modifyPriceGrid"></table>
		</div>
	</div>
</body>
</html>
