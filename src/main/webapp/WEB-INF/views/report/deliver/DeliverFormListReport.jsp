<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>配送明细查询</title>
    
    <%@ include file="/WEB-INF/views/include/header.jsp"%>
    <%@ include file="/WEB-INF/views/system/exportChose.jsp"%>
    <script  src="${ctx}/static/js/views/report/deliver/DeliverFormListReport.js"></script>
</head>
<body class="ub uw uh ufs-14 uc-black">

    <div class="ub ub-ver ub-f1 umar-4 upad-4">
		<form id="queryForm" action="" method="post">
			<div class="ub ub-ac">
	            <div class="ubtns">
					<shiro:hasPermission name="JxcDeliverList:search">
						<div class="ubtns-item" onclick="queryForm()">查询</div>
					</shiro:hasPermission>
					<shiro:hasPermission name="JxcDeliverList:export">
						<input type="hidden" id="startCount" name="startCount" />
						<input type="hidden" id="endCount" name="endCount" />
						<div class="ubtns-item"  onclick="exportData()">导出</div>
					</shiro:hasPermission>
					<div class="ubtns-item" id="set" onclick="gFunRefresh()">重置</div>
	                <div class="ubtns-item" onclick="toClose()">退出</div>
	            </div>
	        	<div class="ub ub-ac umar-l20">
	              	 <%@ include file="/WEB-INF/views/component/dateSelectHour.jsp"%>
	            </div>
			</div>
			<div class="ub umar-t8">
                <div class="ub ub-ac uw-300">
                    <div class="umar-r10 uw-70 ut-r">查询机构:</div>
                    <div class="ub ub-ac">
                    	<input type="hidden" id="branchId" name="branchId" value="${branchesGrow.branchesId}"/>
                    	<input type="hidden" id="brancheType" name="brancheType" value="${branchesGrow.type}"/>
                    	<input class="uinp" type="text" id="branchName" name="branchName"/><%--  value="${branchesGrow.branchName}" --%> 
                    	<div class="uinp-more" onclick="selectBranches()" >...</div>
                    </div>	
                </div>
                <div class="ub ub-ac uw-300 umar-l40">
                    <div class="umar-r10 uw-70 ut-r">单据编号:</div>
                    <input class="uinp" type="text" id="formNo" name="formNo">
                </div>
                <div class="ub ub-ac uw-300 umar-l40">
	                <div class="umar-r10 uw-70 ut-r">业务员:</div>
	                <input class="uinp" name="salesman" id="salesman" type="text">
	            </div>
	        </div>
			<div class="ub umar-t8">
				<div class="ub ub-ac uw-300 umar-l40">
					<div class="umar-r10 uw-70 ut-r">货号:</div>
					<input class="uinp" name=skuCode id="skuCode" type="text">
				</div>
	            <div class="ub ub-ac uw-300">
					<div class="umar-r10 uw-70 ut-r">商品类别:</div>
					<div class="ub ub-ac">
						<input id="goodsCategoryId" name="goodsCategoryId" class="uinp" type="hidden"> 
						<input id="categoryCode" name="categoryCode" class="uinp" type="hidden"> 
						<input id="categoryName" name="categoryName" class="uinp" type="text" maxlength="50">
					<div class="uinp-more" onclick="getGoodsType()">...</div>
				</div>
				</div>
				<div class="ub ub-ac uw-300 umar-l40">
					<div class="umar-r10 uw-70 ut-r">单据类型:</div>
					<select class="uselect easyui-combobox" style="width:204px"  name="deliverType" id="deliverType">
	                   	<option value="">全部</option>
						<option value="DO">配送出库</option>
						<option value="DI">配送入库</option>
					</select>
				</div>
	    	</div>
       	</form>
        <div class="ub ub-f1  umar-t8 umar-b8">
			<table id="deliverFormList"></table>
		</div>
    </div>
</body>
</html>
