<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>直调出库</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
	<script src="${ctx}/static/js/views/warehousing/outWareHosingList.js"></script>
    
</head>
<body class="ub uw uh ufs-14 uc-black">
    <div class="ub ub-ver ub-f1 umar-4 upad-4">
    	<form id="queryForm">
	        <div class="ub ub-ac">
	            <div class="ubtns">
	                <div class="ubtns-item" onclick="orderAdd()">新增</div>
	                <div class="ubtns-item" onclick="query()">查询</div>
	                <div class="ubtns-item" onclick="orderDelete()">删除</div>
	                <div class="ubtns-item" onclick="printDesign()">打印</div>
	                <div class="ubtns-item">设置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
					<%@ include file="/WEB-INF/views/component/dateSelect.jsp"%>
	        </div>
	
	        <div class="ub umar-t8">
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">单据编号:</div>
	                <input class="uinp" name="formNo" id="formNo" type="text">
	            </div>
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">操作员:</div>
	                <input class="uinp" name="operateUserId" id="operateUserId" type="hidden">
	                <input class="uinp" id="operateUserName" type="text" readonly="readonly" onclick="selectOperator()" >
	                <div class="uinp-more" onclick="selectOperator()">...</div>
	            </div>
	            <div class="ub ub-ac umar-r80">
		            <div class="umar-r10 uw-60 ut-r">备注:</div>
		            <input class="uinp" type="text">
		        </div>
		        <div class="ub ub-ac umar-r80">
	                <div class="umar-r10 uw-60 ut-r">收货分店:</div>
	                <input class="uinp" name="branchId" id="branchId" type="hidden">
	                <input class="uinp" id="branchName" type="text" readonly="readonly" onclick="selectBranchService()" >
	                <div class="uinp-more" onclick="selectBranchService()">...</div>
	            </div>
	        </div>
	        <div class="ub umar-t8">
	            <div class="ub ub-ac umar-r40">
	                <div class="umar-r10 uw-60 ut-r">审核状态:</div>
	                <div class="ub ub-ac umar-r10">
						<label>
						<input type="radio" name="status" value="1"/><span>审核 </span>
						</label>

	                </div>
	                <div class="ub ub-ac umar-r10">
						<label>
						<input type="radio" name="status" value="0"/><span>未审核 </span>
						</label>

	                </div>
	                <div class="ub ub-ac umar-r10">
						<label>
						<input type="radio" name="status" value="" checked="checked"/><span>全部 </span>
						</label>

	                </div>
	            </div>
	        </div>
        </form>
        <div class="ub umar-t8 ub-f1">
            <table id="outWareHosingOrders"></table>
        </div>

    </div>
</body>
</html>