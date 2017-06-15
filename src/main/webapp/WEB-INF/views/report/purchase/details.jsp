<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>采购明细</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/report/purchase/details.js?V=2.6.0"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="purchaseDetailCx()">查询</div>
	                <input type="hidden" id="startCount" name="startCount" />
					<input type="hidden" id="endCount" name="endCount" />
	                <div class="ubtns-item" onclick="exportDetails()">导出</div>
	                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	            
	             <!-- 引入时间选择控件 -->
	           <div class="ub ub-ac">
<!-- 	            	<div class="umar-r10 uw-70 ut-r">日期:</div> -->
	       			<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
	           </div>
            </div>
	               
	        <div class="ub uline umar-t8">
	        </div>
          <div class="ub umar-t8">
               <div class="ub ub-ac uw-300" id="branchComponent">
                   <div class="umar-r10 uw-80 ut-r">机构名称:</div>
				   <div class="ub">
                   	   <input class="uinp" type="hidden" id="branchId" name="branchId" >
					   <input class="uinp" type="text" id="branchName" name="branchName" maxlength="50">
					   <div class="uinp-more" id="branchSelect">...</div>
				   </div>
               </div>
               <div class="ub ub-ac uw-300" id="supplierComponent">
				<div class="umar-r10 uw-80 ut-r">供应商:</div>
				   <div class="ub">
					   <input type="hidden" name="supplierId" id="supplierId" class="uinp" />
					   <input type="text" name="supplierName" id="supplierName" class="uinp" maxlength="50" />
					   <div class="uinp-more" id="supplierSelect">...</div>
				   </div>
			  </div>
			  <div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-80 ut-r">类别:</div>
				<input type="hidden" name="categoryId" id="categoryId" class="uinp" />
				  <div class="ub">
					  <input type="text" name="categoryName" id="categoryName" class="uinp" maxlength="50" />
					  <div class="uinp-more" id="categorySelect" onclick="searchCategory()">...</div>
				  </div>
			  </div>
            </div>
            
             <div class="ub umar-t8">
               <div class="ub ub-ac uw-300">
                   <div class="umar-r10 uw-80 ut-r">单据类型:</div>
                   <select class="uselect easyui-combobox" style="width: 204px;" name="formType" id="formType" data-options="onChange:onChangeFormType">
                   		<option value="">全部</option>
                   		<option value="PI">采购收货单</option>
                        <option value="PR">采购退货单</option>
                        <option value="PM">直送收货单</option>
                   </select>
               </div>
               <div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-80 ut-r" >单号:</div>
				<input type="text" name="formNo" id="formNo" class="uinp" />
			   </div>
			  <div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-80 ut-r">货号/条码:</div>
				<input type="text" name="skuCodeOrBarCode" id="skuCodeOrBarCode" class="uinp" />
			  </div>
            </div>
            
       	</form>
        <div class="ub ub-f1 umar-t20">
			 <table id="purReportDetail"></table>
		</div>
    </div>
</body>
</html>