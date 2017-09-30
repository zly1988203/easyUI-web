<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>供应商过期订单查询</title>
<%@ include file="/WEB-INF/views/include/header.jsp"%>
<%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
<script src="${ctx}/static/js/views/report/purchase/expireFormList.js?V=${versionNo}6"></script>
<style>
.datagrid-header-row .datagrid-cell{text-align: center!important;}
</style>
</head>
<body class="ub uw uh ufs-14 uc-black">
<div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
            <input type="hidden" id="startCount" name="startCount" />
            <input type="hidden" id="endCount" name="endCount" />
			<div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="purchaseTotalCx()">查询</div>
	                <div class="ubtns-item" onclick="exportTotal()">导出</div>
	                <div class="ubtns-item" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	             <!-- 引入时间选择控件 -->
	           <div class="ub ub-ac">
	            	<!-- <div class="umar-r10 uw-80 ut-r">日期:</div> -->
	       			<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
	           </div>
            </div>
	               
	        <div class="ub uline umar-t8">
	        </div>
	         
          <div class="ub umar-t8">
               <div class="ub ub-ac uw-300" id="branchTemp">
                   <div class="umar-r10 uw-80 ut-r">机构:</div>
					<input class="uinp" type="hidden" id="branchId" name="branchId" >
					<input class="uinp ub ub-f1" type="text" id="branchName" maxlength="50">
					<div class="uinp-more">...</div>
               </div>
			   <div class="ub ub-ac uw-300">
				<div class="umar-r10 uw-80 ut-r" >单号:</div>
				<input type="text" name="formNo" id="formNo" class="uinp ub ub-f1" />
			   </div>
            </div>
            
             <div class="ub umar-t8">
               <div class="ub ub-ac uw-300" id="supplierComponent">
				<div class="umar-r10 uw-80 ut-r">供应商:</div>
				<input type="hidden" name="supplierId" id="supplierId" class="uinp" />
				<input type="hidden" name="supplierCode" id="supplierCode" class="uinp" />
				<input type="text" id="supplierName" class="uinp ub ub-f1" maxlength="50"/>
				<div class="uinp-more" id="supplierSelect">...</div>
			   </div>
                <div class="ub ub-ac">
                   <div class="umar-r10 uw-80 ut-r">查询类型:</div>
					<div class="ub ub-ac umar-r10">
						<label> <input class=" radioItem" type="radio"
							name="searchType" value="formNoTotal" checked="checked" /> 按单
						</label>
					</div>
					<div class="ub ub-ac umar-r10">
						<label> <input class=" radioItem" type="radio"
							name="searchType" value="supplierTotal" /> 供应商汇总
						</label>
					</div>
				</div>
            </div>
       	</form>

        <div class="ub ub-f1 umar-t20">
			 <table id="purReportTotal"></table>
		</div>
    </div>
</body>
</html>